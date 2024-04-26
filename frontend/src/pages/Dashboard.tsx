
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



const Dashboard = () => {
  
  const [fetchedUserData, setFetchedUserData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fault, setFault] = useState(false)

  let userId = ""
    const [searchParams, setSearchParams] = useSearchParams()
    if(searchParams.get("userId")){
        userId = searchParams.get("userId") || ""
        localStorage.setItem("userId", userId)
    }
    
    if(localStorage.getItem("userId") != null) {
        userId = localStorage.getItem("userId") || ""
    }
    const dispatch = useDispatch<AppDispatch>();
     useEffect(() => {
    dispatch(getUserAsync(userId))
    setFetchedUserData(true)
    }, [])

  const userJson:any = useSelector((state: RootState) => state.user.value)

  const url = `${import.meta.env.VITE_BACKEND_URL}/user/getResume?fileName=${userJson?.resumeLink}`; 
  
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const formData = new FormData();

        console.log("inside useeffect " + userJson?.resumeLink + " userId "+userId)
        formData.append("filename", userJson?.resumeLink);
        formData.append("user_id", userId);

        const result = await fetch(
          `${import.meta.env.VITE_AI_URL}/extractResumeDetails`,
          {
            method: 'POST',
            body: formData
          }
        );
        const jsonResponse = await result.json();
        setResponse(jsonResponse);
      } catch (error) {
        console.error('Error:', error);
      } finally{
        setFault(false)
        setLoading(false)
      }
    };

    if(userJson?.resumeLink){
      fetchData();
    }else {
      setFault(true)
    }
 
  }, [userJson]);

  
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
      {response && <Card className="w-[750px] p-8">
        <PersonalInfo name={response?.name} email={response?.email} mobileNumber={response?.mobile_number} />
        <Skills skills={response?.skills} />
        <WorkExperience workDetails={response?.work_details} />
        <CardFooter className="flex justify-center mt-4">
          <Button className="w-full">View Suggested Courses</Button>
        </CardFooter>
      </Card>}
    </div>
  );
};

export default Dashboard;