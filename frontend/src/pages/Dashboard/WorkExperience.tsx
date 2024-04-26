import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';


const genAI = new GoogleGenerativeAI('AIzaSyBTDd3wMVZyqLCdCpZ9OhsRIQ715OWuUpQ');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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

  export default WorkExperience