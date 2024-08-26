import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ThemeProvider } from './theme/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/themes.css'
import Login from './pages/auth/Login';

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  </React.StrictMode>,
)
