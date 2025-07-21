import { NextRequest, NextResponse } from 'next/server'

const activeRequests = new Map<string, AbortController>()

export async function POST(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const { chatId } = params
    
    const controller = activeRequests.get(chatId)
    if (controller) {
      controller.abort()
      activeRequests.delete(chatId)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error stopping generation:', error)
    return NextResponse.json({ error: 'Failed to stop generation' }, { status: 500 })
  }
}

export function registerActiveRequest(chatId: string, controller: AbortController) {
  activeRequests.set(chatId, controller)
}

export function unregisterActiveRequest(chatId: string) {
  activeRequests.delete(chatId)
}