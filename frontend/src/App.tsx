
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import UploadResume from "./pages/UploadResume"
import SiteLayout from "./pages/SiteLayout"
import Dashboard from "./pages/Dashboard"
import Jobs from "./pages/Jobs"
import Roadmap from "./pages/Roadmap"
import Profile from "./pages/Profile"
import Auth from "./pages/Auth"
import { useEffect } from "react"
import AuthRequired from "./pages/AuthRequired"


function App() {

  return (
    <ThemeProvider defaultTheme="dark">
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route element={<AuthRequired />}> 
            <Route path="/" element={<SiteLayout />}>
              <Route index element={<UploadResume />} /> 
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="profile" element={<Profile />} />
            </Route> 
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
