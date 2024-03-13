import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Hello from './components/test/Hello.tsx'
import Bye from './components/test/Bye.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import UploadResume from './pages/UploadResume.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} /> 
          <Route path="hello" element={<Hello/>} />
          <Route path="bye" element={<Bye />} />
          <Route path="upload" element={<UploadResume />} />  
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
