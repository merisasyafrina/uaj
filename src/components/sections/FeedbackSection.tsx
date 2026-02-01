'use client';

import { useState } from 'react';

const TOPICS: string[] = [
  'Pertanyaan tentang buku',
  'Masukan / saran',
  'Laporan kesalahan',
  'Kerja sama',
  'Lainnya',
];

export function FeedbackSection() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !topic || !message.trim()) return;
    setStatus('loading');
    setFeedbackMessage('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          topic,
          message: message.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setFeedbackMessage(data?.error || 'Gagal mengirim. Silakan coba lagi.');
        return;
      }

      setStatus('success');
      setFeedbackMessage('Pesan Anda telah kami terima. Terima kasih!');
      setEmail('');
      setTopic('');
      setMessage('');
    } catch {
      setStatus('error');
      setFeedbackMessage('Gagal mengirim. Periksa koneksi dan coba lagi.');
    }
  }

  return (
    <section id="feedback" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
          Hubungi Kami
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
          Punya pertanyaan atau masukan? Isi form di bawah.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="feedback-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email
            </label>
            <input
              id="feedback-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              disabled={status === 'loading'}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 min-h-[48px] text-slate-900 dark:text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 touch-manipulation"
            />
          </div>

          <div>
            <label htmlFor="feedback-topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Apa yang bisa kami bantu?
            </label>
            <select
              id="feedback-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              disabled={status === 'loading'}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 min-h-[48px] text-slate-900 dark:text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 touch-manipulation"
            >
              <option value="">— Pilih —</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="feedback-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Pesan
            </label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan Anda (min. 10 karakter)..."
              required
              minLength={10}
              rows={4}
              disabled={status === 'loading'}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 min-h-[120px] text-slate-900 dark:text-white placeholder-slate-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-y touch-manipulation"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-lg bg-sky-600 px-4 py-3 min-h-[48px] font-medium text-white hover:bg-sky-700 active:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed transition touch-manipulation"
          >
            {status === 'loading' ? 'Mengirim...' : 'Kirim'}
          </button>
        </form>

        {feedbackMessage && (
          <p
            className={`mt-4 text-sm text-center ${
              status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {feedbackMessage}
          </p>
        )}
      </div>
    </section>
  );
}
