import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, Package, UserCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AppLayout = ({ children }) => {
  const { admin, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await logout();
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur md:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-800" aria-hidden="true">
            <Package size={22} />
          </span>
          <div className="min-w-0">
            <p className="mb-1 truncate text-xs font-bold uppercase text-slate-500">Admin Workspace</p>
            <h1 className="truncate text-lg font-bold text-slate-950 sm:text-xl">Product Management</h1>
          </div>
        </div>

        <div className="relative shrink-0" ref={profileRef}>
          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 font-bold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 focus-visible:border-teal-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal-700/20"
            type="button"
            onClick={() => setIsProfileOpen(current => !current)}
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            title="Profile"
          >
            <UserCircle size={21} />
            <span className="hidden max-w-40 truncate sm:inline">{admin?.name || 'Admin'}</span>
            <ChevronDown
              className={`transition ${isProfileOpen ? 'rotate-180' : ''}`}
              size={16}
              aria-hidden="true"
            />
          </button>

          {isProfileOpen ? (
            <div
              className="absolute right-0 top-13 z-20 w-[min(18rem,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-3 shadow-xl"
              role="menu"
            >
              <div className="flex items-start gap-3 border-b border-slate-100 px-2 pb-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-800">
                  <UserCircle size={24} />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-950">{admin?.name || 'Admin'}</p>
                  <p className="truncate text-sm font-medium text-slate-500">{admin?.email}</p>
                </div>
              </div>
              <button
                className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-bold text-red-700 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-700/15"
                type="button"
                onClick={handleLogout}
                role="menuitem"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-7 md:px-10 md:pb-11">{children}</main>
    </div>
  );
};

export default AppLayout;
