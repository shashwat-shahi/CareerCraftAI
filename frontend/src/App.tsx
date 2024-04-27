
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import UploadResume from "./pages/UploadResume"
import SiteLayout from "./pages/SiteLayout"
import Dashboard from "./pages/Dashboard"
import Roadmap from "./pages/Roadmap"
import Profile from "./pages/Profile"
import Auth from "./pages/Auth"
import Courses from "./pages/Courses"
import Resume from "./pages/Resume"
import Jobboard from "./pages/Jobboard"


function App() {

  return (
    <ThemeProvider >
    <BrowserRouter >
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<UploadResume />} /> 
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="profile" element={<Profile />} />
            <Route path="courses" element={<Courses />} />
            <Route path="resume" element={<Resume />} />
            <Route path="jobboard" element={<Jobboard />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
          </Route> 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
