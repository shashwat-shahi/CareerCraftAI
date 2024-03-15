
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
import { isJSessionIdPresent } from "./utils/jsession-token"
import AuthRequired from "./pages/AuthRequired"


function App() {

  useEffect(() => {
    fetch('http://localhost:8080/ping')
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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
