import resume_details from "../data/resume_details.json"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';



const genAI = new GoogleGenerativeAI('AIzaSyBTDd3wMVZyqLCdCpZ9OhsRIQ715OWuUpQ');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


const PersonalInfo = ({ name, email, mobileNumber }) => {
  return (
    <div className="space-y-4">
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor="name" className="text-xl font-bold">Name</Label>
    <Input id="name" value={name} disabled />
  </div>
  <div className="flex flex-col space-y-1.5 mt-4">
    <Label htmlFor="email" className="text-xl font-bold">Email</Label>
    <Input id="email" value={email} disabled />
  </div>
  <div className="flex flex-col space-y-1.5 mt-4">
    <Label htmlFor="mobileNumber" className="text-xl font-bold">Mobile Number</Label>
    <Input id="mobileNumber" value={mobileNumber} disabled />
  </div>
</div>
  );
};

const Skills = ({ skills }) => {
  return (
    <div className="flex flex-col space-y-1.5 mt-4 ">
              <Label htmlFor="skill" className="text-xl font-bold">Click on drop down to view all skills</Label>
              <Select>
                <SelectTrigger id="skill">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                {
                    skills.map(skill => <SelectItem key={skill} value={skill}>{skill}</SelectItem>)
                }
                </SelectContent>
              </Select>
      </div>
  );
};

const WorkExperience = ({ workDetails }) => {
  
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const prompt = `Summarize the work experience in good format ${JSON.stringify(workDetails)}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setLoading(false)
      setData(text)
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="mt-4">
      <Label className="text-xl font-bold" htmlFor="work_experience">Work Experience Summary</Label>
      {loading ? <div className="mt-4"><svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg></div> : <div className="mt-4"><ReactMarkdown>{data}</ReactMarkdown></div>}
    </div>
  );
}; 



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