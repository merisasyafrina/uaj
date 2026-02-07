import { downloadTokens } from '@/lib/download-tokens';
import { NextRequest, NextResponse } from 'next/server';

const PDF_FILENAME = 'Khusyuk-Itu-Mudah.pdf';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }

  const entry = downloadTokens.get(token);
  if (!entry) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
  }
  if (Date.now() > entry.exp) {
    downloadTokens.delete(token);
    return NextResponse.json({ error: 'Token expired' }, { status: 404 });
  }

  const { pdfUrl } = entry;
  downloadTokens.delete(token);

  try {
    const res = await fetch(pdfUrl, { redirect: 'follow' });
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch PDF' },
        { status: 502 }
      );
    }

    const contentType = res.headers.get('content-type') || 'application/pdf';
    const headers = new Headers();
    headers.set(
      'Content-Disposition',
      `attachment; filename="${PDF_FILENAME}"`
    );
    headers.set('Content-Type', contentType);
    const contentLength = res.headers.get('content-length');
    if (contentLength) headers.set('Content-Length', contentLength);

    return new NextResponse(res.body, {
      status: 200,
      headers,
    });
  } catch (e) {
    console.error('Download PDF proxy error:', e);
    return NextResponse.json(
      { error: 'Failed to download PDF' },
      { status: 502 }
    );
  }
}
