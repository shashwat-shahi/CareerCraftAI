
// @ts-nocheck
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import PersonalInfo from "./Dashboard/PersonalInfo";
import Skills from "./Dashboard/Skills";
import WorkExperience from "./Dashboard/WorkExperience";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getUserAsync } from "@/state/user/userSlice";
import { useNavigate } from 'react-router-dom';
import resume_details from '../data/resume_details.json'



const Dashboard = () => {
  const navigate = useNavigate();
  const handleViewCoursesClick = () => {
    navigate('/courses');
  };
  const [fetchedUserData, setFetchedUserData] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fault, setFault] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);
  
    return () => clearTimeout(timer);
  }, []);

  if(loading){
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
      className="animate-pulse"
    >
      <path d="M4 5h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
      <path d="M8 11h8v6H8z" />
      <path d="M8 7v4" />
      <path d="M16 7v4" />
    </svg>
    <p className="text-lg font-semibold">Analyzing Resume...</p>
  </div>
  }

  if(fault){
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

  return (
    <div className="flex justify-center mt-5">
      {resume_details && <Card className="w-[750px] p-8">
        <PersonalInfo name={resume_details?.name} email={resume_details?.email} mobileNumber={resume_details?.mobile_number} />
        <Skills skills={resume_details?.skills} />
        <WorkExperience workDetails={resume_details?.work_details} />
        <CardFooter className="flex justify-center mt-4">
            <Button className="w-full" onClick={handleViewCoursesClick}>
              View Suggested Courses
            </Button>
        </CardFooter>
      </Card>}
    </div>
  );
};

export default Dashboard;