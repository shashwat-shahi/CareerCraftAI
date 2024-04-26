
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
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getUserAsync } from "@/state/user/userSlice";


const Dashboard = () => {
  
  const [fetchedUserData, setFetchedUserData] = useState(false)
  let userId = localStorage.getItem("userId")

  const userJson:any = useSelector((state: RootState) => state.user.value)

  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
    dispatch(getUserAsync(userId))
    setFetchedUserData(true)
  }, [userId])

  const url = `${import.meta.env.VITE_BACKEND_URL}/user/getResume?fileName=${userJson?.resumeLink}`; 
  
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      }
    };

    if(userJson){
      fetchData();
    }
      
 
  }, [userJson]);

  

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