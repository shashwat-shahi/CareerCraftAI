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
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import useFetch from "../hooks/use-fetch"

function UploadResume() {
    const navigate = useNavigate()
    const [data, setData] = useState(
        {
            aspirationalJob: "",
            resume: ""
        }
    )
    let userId = ""
    const [searchParams, setSearchParams] = useSearchParams()
    if(searchParams.get("userId")){
        userId = searchParams.get("userId") || ""
        console.log("store in localstorage")
        localStorage.setItem("userId", userId)
    }
    
    if(localStorage.getItem("userId") != null) {
        userId = localStorage.getItem("userId") || ""
    }

    const {val, loading, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/aspiration/getAspirations`)
    console.log(val, loading, error)

    

    const handleFileChange = (e: any) => {
        setData({
            ...data,
            resume: e.target.files[0]
        })
    }

    const handleSelectChange = (selectedValue) => {
        setData({
            ...data,
            aspirationalJob: selectedValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        
        const uploadFormData = new FormData();
        uploadFormData.append("resumeFile", data.resume);
        const queryParams = new URLSearchParams();
        queryParams.append("aspiration", data.aspirationalJob);
        const queryString = queryParams.toString();
    
        const url = `${import.meta.env.VITE_BACKEND_URL}/user/updateUser/${userId}?${queryString}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: uploadFormData,
                credentials: 'include',
            });
            if (response.ok) {
                toast.success("Upload successful, redirecting to the dashboard.")

                setTimeout(() => {
                    navigate("/dashboard")
                }, 5000)
             
            } else {
                console.log('Upload failed');
            }
        } catch (error) {
            setSearchParams(prev => prev)
            console.log('Error submitting form');
        }
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
                            onChange={handleFileChange}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="jobs">Jobs</Label>
                        <Select onValueChange={(value) => handleSelectChange(value)}>
                            <SelectTrigger id="jobs">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {
                                    val && val.map(asp => <SelectItem key={asp.id} value={asp.id.toString()}>{asp.name}</SelectItem>)
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
