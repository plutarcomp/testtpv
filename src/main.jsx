import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ThemeProvider } from './theme/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/themes.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({})


const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
