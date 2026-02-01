import { createClient } from '@/lib/supabase/server';
import {
  cleanupExpiredTokens,
  downloadTokens,
  DOWNLOAD_TOKEN_TTL_MS,
} from '@/lib/download-tokens';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email tidak valid.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.from('download_leads').insert({ email });

    if (error) {
      console.error('Supabase download_leads insert:', error);
      return NextResponse.json(
        { error: 'Gagal menyimpan. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    const pdfUrl = process.env.NEXT_PUBLIC_BOOK_PDF_URL || '';
    let downloadToken = '';

    if (pdfUrl) {
      cleanupExpiredTokens();
      downloadToken = randomBytes(24).toString('hex');
      downloadTokens.set(downloadToken, {
        pdfUrl,
        exp: Date.now() + DOWNLOAD_TOKEN_TTL_MS,
      });
    }

    return NextResponse.json({ success: true, pdfUrl, downloadToken });
  } catch (e) {
    console.error('Download API error:', e);
    return NextResponse.json(
      { error: 'Terjadi kesalahan. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
