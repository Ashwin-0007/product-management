import { useState } from 'react';
import { LockKeyhole, PackageCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({
        email: form.email.trim(),
        password: form.password,
      });
    } catch (err) {
      setError(err.message || 'Unable to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[linear-gradient(135deg,rgba(15,118,110,0.12),transparent_34%),linear-gradient(315deg,rgba(154,103,0,0.14),transparent_30%)] p-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex min-h-80 flex-col justify-end gap-3 bg-[linear-gradient(145deg,rgba(15,23,42,0.95),rgba(30,41,59,0.86)),url('data:image/svg+xml,%3Csvg_width=%22140%22_height=%22140%22_viewBox=%220_0_140_140%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg_fill=%22none%22_stroke=%22%23ffffff%22_stroke-opacity=%22.13%22%3E%3Cpath_d=%22M0_20h140M0_60h140M0_100h140M20_0v140M60_0v140M100_0v140%22/%3E%3C/g%3E%3C/svg%3E')] p-8 text-white md:min-h-[430px] md:p-12">
          <span className="grid h-14 w-14 place-items-center rounded-lg bg-white/10 text-white" aria-hidden="true">
            <PackageCheck size={30} />
          </span>
          <p className="text-xs font-bold uppercase text-white/70">Product Management Dashboard</p>
          <h1 className="max-w-md text-4xl font-bold leading-tight md:text-[42px]">Admin catalog control</h1>
          <p className="max-w-md leading-7 text-white/80">
            Manage product names, categories, prices, and stock states from one focused workspace.
          </p>
        </div>

        <form className="flex flex-col justify-center gap-5 p-7 md:p-11" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2.5">
            <LockKeyhole size={20} />
            <h2 className="text-2xl font-bold">Sign in</h2>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          <label className="flex flex-col gap-2 text-sm font-bold text-slate-900">
            <span>Email</span>
            <input
              className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-teal-700 focus:ring-3 focus:ring-teal-700/20"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-bold text-slate-900">
            <span>Password</span>
            <input
              className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:border-teal-700 focus:ring-3 focus:ring-teal-700/20"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </label>

          <button
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-teal-700 px-4 font-bold text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/25"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
