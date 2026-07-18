if (typeof (window as unknown as Record<string, unknown>).global === 'undefined') {
  (window as unknown as Record<string, unknown>).global = window;
}

import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './hooks/use-theme.tsx';
import { Navbar } from './components/navbar.tsx';
import { Footer } from './components/footer.tsx';

import { ErrorBoundary } from './components/ui/error-boundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider defaultTheme='system'>
        <Suspense fallback={'Loading...'}>
          <BrowserRouter>
            <Navbar />
            <div className='flex min-h-screen flex-col'>
              <App />
            </div>
            <Footer />
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
