import { Button } from "@/components/ui/button"
import useFetch from "../hooks/use-fetch"
import { useState } from "react"
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