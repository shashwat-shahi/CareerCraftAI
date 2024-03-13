import { Outlet } from 'react-router-dom'
import NavigationBar from './NavigationBar'

function SiteLayout() {
  return (
    <div>
        <NavigationBar />
        <Outlet />
    </div>
  )
}

export default SiteLayout