import { NextResponse } from 'next/server'
import pool from '../../../lib/db'

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM chats ORDER BY created_at DESC'
    )
    
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching chats:', error)
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 })
  }
}