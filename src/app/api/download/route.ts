import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

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
    return NextResponse.json({ success: true, pdfUrl });
  } catch (e) {
    console.error('Download API error:', e);
    return NextResponse.json(
      { error: 'Terjadi kesalahan. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
