import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

function UploadResume() {
    const navigate = useNavigate()

    let roles = [
        "Data Scientist",
        "Software Architect",
        "Frontend Developer",
        "Data Analyst",
        "Backend Developer",
        "Blockchain Developer",
        "Devops Engineer",
        "MLOps",
        "Springboot Developer",
        "Software Quality Assurance Engineer",
        "PostgreSQL Database Administrator",
        "ASP .NET Developer",
        "Full Stack Developer",
        "Game Developer",
        "Android Developer"
        ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        toast.success("Upload successful, redirecting to the dashboard.")
        navigate("/dashboard")
    };
    
  return (
    <div className="flex min-h-[90vh]">
        <Toaster richColors toastOptions={{}}/>
        <Card className="w-[350px] self-center mx-auto">
            <CardHeader>
                <CardTitle>Submit your resume</CardTitle>
                <CardDescription>AI analyzes resumes, focusing on relevance, skills and experience.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="resume">Resume - upload only pdf</Label>
                        <Input
                            id="resume"
                            name="resume"
                            type="file"
                            className="bg-secondary"
                            accept=".pdf"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="jobs">Jobs</Label>
                        <Select>
                            <SelectTrigger id="jobs">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {
                                    roles && roles.map(asp => <SelectItem key={asp} value={asp}>{asp}</SelectItem>)
                                }
                            </SelectContent>
                        </Select>
                        </div>
                        <Button type="submit">Analyze your resume</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default UploadResume
