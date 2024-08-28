import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ThemeProvider } from './theme/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/themes.css'
import Login from './pages/auth/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({})


const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
