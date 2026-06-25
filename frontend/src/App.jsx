import { useAuth } from './hooks/useAuth';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

const App = () => {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return (
      <main className="grid min-h-screen place-items-center p-6">
        <div
          className="h-9 w-9 animate-spin rounded-full border-3 border-slate-300 border-t-teal-700"
          aria-label="Loading application"
        />
      </main>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <AppLayout>
      <ProductsPage />
    </AppLayout>
  );
};

export default App;
