import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "./components/ui/button"

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Button>Click me</Button>
    </ThemeProvider>
  )
}

export default App
