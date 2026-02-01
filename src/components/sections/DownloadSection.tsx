'use client';

import { useState } from 'react';

export function DownloadSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error || 'Gagal. Silakan coba lagi.');
        return;
      }

      setStatus('success');
      setMessage('Terima kasih! PDF akan dibuka di tab baru.');
      setEmail('');

      const pdfUrl = data?.pdfUrl;
      if (pdfUrl) {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      } else {
        setMessage('Email tersimpan. Link PDF belum dikonfigurasi (NEXT_PUBLIC_BOOK_PDF_URL).');
      }
    } catch {
      setStatus('error');
      setMessage('Gagal mengirim. Periksa koneksi dan coba lagi.');
    }
  }

  return (
    <section id="unduh" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
          Unduh Buku
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
          Masukkan email untuk mengunduh PDF buku <strong>Khusyuk Itu Mudah</strong> gratis.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="download-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email
            </label>
            <input
              id="download-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              disabled={status === 'loading'}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 min-h-[48px] text-slate-900 dark:text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 touch-manipulation"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-lg bg-sky-600 px-4 py-3 min-h-[48px] font-medium text-white hover:bg-sky-700 active:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed transition touch-manipulation"
          >
            {status === 'loading' ? 'Memproses...' : 'Unduh PDF'}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
