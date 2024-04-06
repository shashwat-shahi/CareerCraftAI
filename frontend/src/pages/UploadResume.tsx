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
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import useFetch from "../hooks/use-fetch"




function UploadResume() {

    const [data, setData] = useState(
        {
            aspirationalJob: "",
            resume: ""
        }
    )
    const [searchParams, setSearchParams] = useSearchParams()

    
    const {val, loading, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/aspiration/getAspirations`)
    console.log(val)

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
                toast.success("Upload successful.")
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
                                {
                                    val && val.map(asp => <SelectItem key={asp.id} value={asp.id.toString()}>{asp.name}</SelectItem>)
                                }
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
