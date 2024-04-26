import { Button } from "@/components/ui/button"
import useFetch from "../hooks/use-fetch"
import { useEffect, useState } from "react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Link } from "react-router-dom"
import resume_details from "../data/resume_details.json"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/state/store"
import { getUserAsync } from "@/state/user/userSlice"


function Courses() {
  
  let keywords = resume_details.skills;

  const [activeCourse, setActiveCourse] = useState(null)

  const {val, loading, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/course/getCoursesFromKeyword/${activeCourse}`)
  console.log(loading)

  if (keywords.length == 0){
    return <h1>No Keywords detected in resume re upload</h1>
  }
 
 

  if (error){
    return (
      <h1>{error}</h1>
    )
  }

  let userId = ""

  if(localStorage.getItem("userId") != null) {
    userId = localStorage.getItem("userId") || ""
}

  const dispatch = useDispatch<AppDispatch>();
     useEffect(() => {
    dispatch(getUserAsync(userId))
    }, [])

    const userJson:any = useSelector((state: RootState
    ) => state.user.value)


    if(!userJson?.resumeLink){
      return <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-bounce"
      >
        <path d="M4 14v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
        <path d="M14 4h-4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
        <path d="M12 11v5" />
        <path d="M10 14h4" />
      </svg>
      <p className="text-lg font-semibold"><Link to="/" className="text-blue-500 underline">Please Upload Your Resume</Link></p>
    </div>
    }


  const handleSelectChange = (selectedValue) => {
    setActiveCourse(selectedValue)
  };

  return (
    <div className="flex w-screen items-center flex-col">
      <div className="flex flex-wrap justify-between w-8/12 my-9">
        <div className="mb-3"><Label htmlFor="Skills" className="text-xl font-bold" >Skills</Label></div>
          
          <Select onValueChange={(value) => handleSelectChange(value)} >
              <SelectTrigger id="jobs">
                  <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                  {
                      keywords && keywords.map(keyword => <SelectItem key={keyword} value={keyword}>{keyword}</SelectItem>)
                  }
              </SelectContent>
          </Select>
      </div>
      <div>
      {!activeCourse && <h1>Select a keyword from the list</h1>} 
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
  {val && val.map(course => (
    <div key={course.id} className="w-full max-w-[250px]">
      <Card className="h-full">
          <CardHeader className="flex flex-col items-center">
            <img src={course.imageUrl} className="my-2 w-full" />
            <CardTitle className="my-2 text-center">{course.title}</CardTitle>
            <CardDescription className="my-2 text-center">{course.headline}</CardDescription>
            <Button asChild className="my-2">
              <Link to={course.url} target="_blank">View More</Link>
            </Button>
          </CardHeader>
      </Card>
    </div>
  ))}
</div>
    </div>
  )
}

export default Courses