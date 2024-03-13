
import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"


function App() {
  return (
    <nav>
      <Link className={buttonVariants({ variant: "outline" })} to="bye">Bye</Link>
      <Link className={buttonVariants({ variant: "outline" })} to="hello">Hello</Link>
    </nav>
  )
}

export default App
