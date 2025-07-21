import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../../lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const { chatId } = params
    
    const chatResult = await pool.query(
      'SELECT * FROM chats WHERE id = $1',
      [chatId]
    )
    
    if (chatResult.rows.length === 0) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }
    
    const messagesResult = await pool.query(
      'SELECT * FROM messages WHERE chat_id = $1 ORDER BY timestamp ASC',
      [chatId]
    )
    
    return NextResponse.json({
      chat: chatResult.rows[0],
      messages: messagesResult.rows
    })
  } catch (error) {
    console.error('Error fetching chat:', error)
    return NextResponse.json({ error: 'Failed to fetch chat' }, { status: 500 })
  }
}