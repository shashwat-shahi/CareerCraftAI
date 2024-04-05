import { Button } from "@/components/ui/button"
import useFetch from "../hooks/use-fetch"
import { useState } from "react"

function Roadmap() {

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


  console.log(data)

  if (keywords.length == 0){
    return <h1>No Keywords detected in resume re upload</h1>
  }
 
  if (loading){
    return (
      <h1>Loading</h1>
    )
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
    <div className="flex w-screen justify-center">
      <div className="flex flex-wrap justify-between w-8/12 my-9">
        {
          keywords.map((keyword) => {
            return <Button key={keyword.courseId} onClick={() => fetchCourseDetails(keyword.courseName)}>{keyword.courseName}</Button>
          })
        }

        {!activeCourse && <h1>Select a keyword from the list</h1>} 
  
      </div>
    </div>
  )
}

export default Roadmap