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
import { useSearchParams } from "react-router-dom"



function UploadResume() {

    const [data, setData] = useState(
        {
            aspirationalJob: "",
            resume: ""
        }
    )
    const [searchParams, setSearchParams] = useSearchParams()
    

    const userId = searchParams.get("userId")
    

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
                alert("Upload successful")
                console.log('Upload successful');
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            setSearchParams(prev => prev)
            console.error('Error submitting form', error);
        }
    };
    
  return (
    <div className="flex min-h-[90vh]">
        <Card className="w-[350px] self-center mx-auto">
            <CardHeader>
                <CardTitle>Submit your resume</CardTitle>
                <CardDescription>AI analyzes resumes, focusing on relevance, skills and experience.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="resume">Resume</Label>
                        <Input
                            id="resume"
                            name="resume"
                            type="file"
                            className="bg-secondary"
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
                                <SelectItem value="1">Frontend Engineer</SelectItem>
                                <SelectItem value="2">Data Scientist</SelectItem>
                                <SelectItem value="3">Infrastructure Engineer</SelectItem>
                                <SelectItem value="4">Backend Engineer</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default UploadResume
