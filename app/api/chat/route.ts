import { NextRequest, NextResponse } from 'next/server'
import pool from '../../../lib/db'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json()
    
    const result = await pool.query(
      'INSERT INTO chats (id, title) VALUES ($1, $2) RETURNING *',
      [uuidv4(), title || 'New Chat']
    )
    
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error creating chat:', error)
    return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 })
  }
}