import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/api-config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Construir a query string com todos os parâmetros
    const queryString = searchParams.toString();
    
    if (!queryString) {
      return NextResponse.json(
        { error: 'Query parameters are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CNAE_LIST}?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching CNAE accounts list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CNAE accounts list' },
      { status: 500 }
    );
  }
}