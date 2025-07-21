import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../../../lib/db'
import { v4 as uuidv4 } from 'uuid'

export async function POST(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const { chatId } = params
    const { content } = await request.json()
    
    await pool.query(
      'INSERT INTO messages (id, chat_id, role, content) VALUES ($1, $2, $3, $4)',
      [uuidv4(), chatId, 'user', content]
    )
    
    const encoder = new TextEncoder()
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'gemma3:1b',
              prompt: content,
              stream: true
            })
          })
          
          if (!ollamaResponse.ok) {
            throw new Error('Ollama API error')
          }
          
          const reader = ollamaResponse.body?.getReader()
          if (!reader) throw new Error('No response body')
          
          let assistantResponse = ''
          let buffer = ''
          
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            
            buffer += new TextDecoder().decode(value)
            
            const lines = buffer.split('\n')
            buffer = lines.pop() || ''
            
            for (const line of lines) {
              if (!line.trim()) continue
              
              try {
                const data = JSON.parse(line)
                
                if (data.response && data.response.length > 0) {
                  assistantResponse += data.response
                  
                  const sseData = `data: ${JSON.stringify({ token: data.response })}\n\n`
                  controller.enqueue(encoder.encode(sseData))
                }
                
                if (data.done === true) {
                  await pool.query(
                    'INSERT INTO messages (id, chat_id, role, content) VALUES ($1, $2, $3, $4)',
                    [uuidv4(), chatId, 'assistant', assistantResponse]
                  )
                  
                  const messageCount = await pool.query(
                    'SELECT COUNT(*) FROM messages WHERE chat_id = $1',
                    [chatId]
                  )
                  
                  if (parseInt(messageCount.rows[0].count) === 2) {
                    const title = content.length > 50 ? content.substring(0, 50) + '...' : content
                    await pool.query(
                      'UPDATE chats SET title = $1 WHERE id = $2',
                      [title, chatId]
                    )
                  }
                  
                  const doneData = `data: ${JSON.stringify({ done: true })}\n\n`
                  controller.enqueue(encoder.encode(doneData))
                  return
                }
              } catch (e) {
                console.error('JSON parse error:', e, 'Line:', line)
              }
            }
          }
        } catch (error) {
          console.error('Streaming error:', error)
          const errorData = `data: ${JSON.stringify({ error: 'Failed to generate response' })}\n\n`
          controller.enqueue(encoder.encode(errorData))
        } finally {
          controller.close()
        }
      }
    })
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}