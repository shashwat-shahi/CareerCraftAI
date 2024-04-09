import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

function NavigationBar() {
  return (
    <NavigationMenu>
        <Link to="/">
          <Avatar>
            <AvatarImage src="/careercraftai_icon.svg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Link to="dashboard">
                  Dashboard
                </Link>
              </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="jobs">
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                Jobs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
              <Link to="roadmap">
                Roadmap
              </Link>
              </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Link to="profile">
                  Profile
                </Link>
              </NavigationMenuLink> 
          </NavigationMenuItem>
          <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Link to="courses">
                  Courses
                </Link>
              </NavigationMenuLink> 
          </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavigationBar