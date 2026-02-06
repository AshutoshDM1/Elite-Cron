import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import Provider from './Provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
