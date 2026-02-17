import { useState, FormEvent } from 'react';

type PasswordGateProps = {
  correctPassword: string;
  children: React.ReactNode;
};

export function PasswordGate({ correctPassword, children }: PasswordGateProps) {
  const [input, setInput] = useState('');
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('zal_demo_auth') === 'true';
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input === correctPassword) {
      setAuthed(true);
      setError('');
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('zal_demo_auth', 'true');
      }
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border-2 border-cyan-400 bg-gradient-to-br from-sky-900 via-slate-950 to-cyan-900 p-5 shadow-xl text-slate-50"
      >
        <h1 className="text-lg font-black tracking-tight mb-2">
          ZALPHA Demo Access 🔒
        </h1>
        <p className="text-xs text-cyan-100 mb-4">
          This preview is locked until the demo. Enter the password to continue.
        </p>
        <label className="block text-xs font-semibold text-cyan-100 mb-1">
          Demo password
        </label>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mb-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 focus:border-cyan-400 focus:outline-none"
          placeholder="Enter demo password"
        />
        {error && (
          <p className="mb-2 text-[11px] text-rose-300">{error}</p>
        )}
        <button
          type="submit"
          className="mt-1 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-3 py-2 text-xs font-bold text-slate-900 shadow-md hover:shadow-lg transition-all"
        >
          Unlock demo
        </button>
      </form>
    </div>
  );
}