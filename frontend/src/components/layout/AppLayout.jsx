import { LogOut, Package } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AppLayout = ({ children }) => {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex flex-col gap-4 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-teal-50 text-teal-800" aria-hidden="true">
            <Package size={22} />
          </span>
          <div>
            <p className="mb-1 text-xs font-bold uppercase text-slate-500">Admin Workspace</p>
            <h1 className="text-xl font-bold text-slate-950">Product Management</h1>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:justify-end">
          <div className="flex min-w-0 flex-col md:items-end">
            <span className="max-w-56 truncate font-bold">{admin?.name || 'Admin'}</span>
            <small className="max-w-56 truncate text-slate-500">{admin?.email}</small>
          </div>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent bg-white text-slate-900 transition hover:border-slate-300 hover:bg-slate-100 focus-visible:border-teal-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/20"
            type="button"
            onClick={logout}
            title="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-7 md:px-10 md:pb-11">{children}</main>
    </div>
  );
};

export default AppLayout;
