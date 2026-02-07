import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_TOPICS = [
  'Pertanyaan tentang buku',
  'Masukan / saran',
  'Laporan kesalahan',
  'Kerja sama',
  'Lainnya',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const topic = typeof body?.topic === 'string' ? body.topic.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email tidak valid.' },
        { status: 400 }
      );
    }

    if (!topic || !ALLOWED_TOPICS.includes(topic)) {
      return NextResponse.json(
        { error: 'Pilih opsi "Apa yang bisa kami bantu?".' },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: 'Pesan minimal 10 karakter.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.from('feedback').insert({
      email,
      topic,
      message,
    });

    if (error) {
      console.error('Supabase feedback insert:', error);
      return NextResponse.json(
        { error: 'Gagal mengirim. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Feedback API error:', e);
    return NextResponse.json(
      { error: 'Terjadi kesalahan. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
