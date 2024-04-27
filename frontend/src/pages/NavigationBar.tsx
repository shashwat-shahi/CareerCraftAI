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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom';


function NavigationBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };
  
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
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Link to="jobboard">
                  Jobboard
                </Link>
              </NavigationMenuLink>
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
                <Link to="courses">
                  Courses
                </Link>
              </NavigationMenuLink> 
          </NavigationMenuItem>
          <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Resume
              </NavigationMenuLink>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="resume">View Resume</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/">Change Resume</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
          <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Profile
              </NavigationMenuLink>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive-foreground"
                onClick={() => {
                  handleClick();
                }}
              >
                <strong>Logout</strong>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavigationBar