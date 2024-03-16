import { Outlet } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import { Toaster } from '@/components/ui/toaster'

function SiteLayout() {
  return (
    <div>
        <NavigationBar />
        <Outlet />
    
    </div>
  )
}

export default SiteLayout