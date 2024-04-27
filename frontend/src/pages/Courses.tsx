// @ts-nocheck
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Link } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import courses from '../data/courses.json'
import automl_skill from "../data/automl_skill.json"
import cloudml_skill from "../data/cloudml_skill.json"
import model_skill from "../data/model_skill.json"


function Courses() {

  const [activeCourse, setActiveCourse] = useState("Select")

  const handleSelectChange = (selectedValue) => {
    setLoading(true);
    setActiveCourse(selectedValue);
  
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const [coursesArray, setCoursesArray] = useState([]);


  const [loading, setLoading] = useState(false)
  const [fault, setFault] = useState(false);
  

  return (
    <div className="flex w-screen items-center flex-col">
      <div className="space-y-4 w-96 mb-12" >
  <div className="w-full">
    <Label htmlFor="fundamentals">Fundamentals</Label>
    <Select onValueChange={(value) => handleSelectChange(value)} className="w-full">
      <SelectTrigger id="fundamentals">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="popper">
        {courses.fundamentals &&
          courses.fundamentals.map((keyword) => (
            <SelectItem key={keyword} value={keyword}>
              {keyword}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  </div>

  <div>
    <Label htmlFor="intermediate">Intermediate</Label>
    <Select onValueChange={(value) => handleSelectChange(value)} className="w-full">
      <SelectTrigger id="intermediate">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="popper">
        {courses.intermediate &&
          courses.intermediate.map((keyword) => (
            <SelectItem key={keyword} value={keyword}>
              {keyword}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  </div>

  <div>
    <Label htmlFor="advanced">Advanced</Label>
    <Select onValueChange={(value) => handleSelectChange(value)} className="w-full mb-1.5">
      <SelectTrigger id="advanced">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="popper">
        {courses.advanced &&
          courses.advanced.map((keyword) => (
            <SelectItem key={keyword} value={keyword}>
              {keyword}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  </div>
</div>
      <div>
      {!activeCourse && <h1>Select a keyword from the list</h1>} 
      </div>

      {loading ? (
      <div className="flex flex-col items-center justify-center space-y-4">
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
          className="animate-pulse"
        >
          <path d="M4 5h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
          <path d="M8 11h8v6H8z" />
          <path d="M8 7v4" />
          <path d="M16 7v4" />
        </svg>
        <p className="text-lg font-semibold">Fetching Course Details...</p>
      </div>
    ) :
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
  {  
    activeCourse === "Cloud ML" ? cloudml_skill.map(course => (
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
    )) : activeCourse === "Auto ML" ? automl_skill.map(course => (
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
    ))
    : activeCourse === "Select" ? <div></div> :model_skill.map(course => (
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
      </div>))
  }
</div>}
    </div>
  )
}

export default Courses