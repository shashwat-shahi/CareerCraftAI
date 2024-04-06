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
import { Skeleton } from "@/components/ui/skeleton"


function Courses() {
  
  let keywords = [
    { courseId: 1, courseName: 'Python' },
    { courseId: 2, courseName: 'Machine Learning' },
    { courseId: 3, courseName: 'Statistics' },
    { courseId: 4, courseName: 'Probability' },
    { courseId: 5, courseName: 'CPP' },
    { courseId: 6, courseName: 'Python' },
    { courseId: 7, courseName: 'Machine Learning' },
    { courseId: 8, courseName: 'Statistics' },
    { courseId: 9, courseName: 'Probability' }
  ]

  const [activeCourse, setActiveCourse] = useState(null)

  const {data, loading, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/course/getCoursesFromKeyword/${activeCourse}`)

  if (keywords.length == 0){
    return <h1>No Keywords detected in resume re upload</h1>
  }
 
 

  if (error){
    return (
      <h1>{error}</h1>
    )
  }

  const fetchCourseDetails = (course) => {
    setActiveCourse(course)
  }

  return (
    <div className="flex w-screen items-center flex-col">
      <div className="flex flex-wrap justify-between w-8/12 my-9">
        {
          keywords.map((keyword) => {
            return <Button key={keyword.courseId} onClick={() => fetchCourseDetails(keyword.courseName)}>{keyword.courseName}</Button>
          })
        }
        
      </div>
      <div>
      {!activeCourse && <h1>Select a keyword from the list</h1>} 
      </div>
      <div className="flex flex-wrap gap-20 justify-center">
      {data && data.map(course => <div key={course.id}>
            <Card className="h-auto w-64"> 
             {loading ? 
             <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              </div>
              </div> 
              : 
            <CardHeader>
                <img src={course.imageUrl} className="my-2"/>
                <CardTitle className="my-2">{course.title}</CardTitle>
                <CardDescription className="my-2">{course.headline}</CardDescription>
                <Button asChild className="my-2">
                  <Link to={course.url} target="_blank">View More</Link>
                </Button>
              </CardHeader>}
            </Card>
        </div>)}
      </div>
    </div>
  )
}

export default Courses