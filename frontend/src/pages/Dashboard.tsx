import resume_details from "../data/resume_details.json"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import PersonalInfo from "./Dashboard/PersonalInfo";
import Skills from "./Dashboard/Skills";
import WorkExperience from "./Dashboard/WorkExperience";

const Dashboard = () => {
  const data = resume_details
  console.log(data)
  return (
    <div className="flex justify-center mt-5">
      <Card className="w-[750px] p-8">
        <PersonalInfo name={data.name} email={data.email} mobileNumber={data.mobile_number} />
        <Skills skills={data.skills} />
        <WorkExperience workDetails={data.work_details} />
        <CardFooter className="flex justify-center mt-4">
          <Button className="w-full">View Suggested Courses</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;