
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import UploadResume from "./pages/UploadResume"
import SiteLayout from "./pages/SiteLayout"
import Dashboard from "./pages/Dashboard"
import Jobs from "./pages/Jobs"
import Roadmap from "./pages/Roadmap"
import Profile from "./pages/Profile"
import Auth from "./pages/Auth"


function App() {
  return (
    <ThemeProvider defaultTheme="dark">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiteLayout />}>
            <Route path="login" element={<Auth />} />
            <Route index element={<UploadResume />} /> 
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="profile" element={<Profile />} />
          </Route> 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
