import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, 'GET', params.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, 'POST', params.path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, 'PUT', params.path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, 'DELETE', params.path);
}


async function handleRequest(
  request: NextRequest,
  method: string,
  pathParts: string[]
) {
  try {
    const path = pathParts.join('/');
    const url = `${API_URL}/api/${path}`;
    
    console.log(`Forwarding ${method} request to: ${url}`);
    
    let body: string | undefined;
    if (method !== 'GET') {
      body = JSON.stringify(await request.json().catch(() => ({})));
    }
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      cache: method === 'GET' ? 'no-store' : undefined,
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (
      response.headers.get('Content-Type')?.includes('text/plain') &&
      pathParts.includes('message')
    ) {
      console.log('Handling streaming response');
      
      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader();
          if (!reader) {
            console.error('No reader available');
            controller.close();
            return;
          }
          
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                console.log('Stream complete');
                break;
              }
              
              controller.enqueue(value);
            }
          } catch (error) {
            console.error('Stream error:', error);
          } finally {
            controller.close();
            reader.releaseLock();
          }
        }
      });
      
      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }
    
    const data = await response.json().catch(() => ({ error: 'Invalid JSON response' }));
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`API route error:`, error);
    return NextResponse.json(
      { error: 'Failed to process request', details: (error as Error).message },
      { status: 500 }
    );
  }
}