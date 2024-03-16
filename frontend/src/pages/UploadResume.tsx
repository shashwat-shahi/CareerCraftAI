import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"



function UploadResume() {

    const [formData, setFormData] = useState(
        {
            aspirationalJob: "",
            resume: null
        }
    )

    const handleFileChange = (e: any) => {
        setFormData({
            ...formData,
            resume: e.target.files[0]
        })
    }

    const handleSelectChange = (selectedValue) => {
        setFormData({
            ...formData,
            aspirationalJob: selectedValue
        });
    };

    console.log(formData)

  return (
    <div className="flex min-h-[90vh]">
        <Card className="w-[350px] self-center mx-auto">
            <CardHeader>
                <CardTitle>Submit your resume</CardTitle>
                <CardDescription>AI analyzes resumes, focusing on relevance, skills and experience.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
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
                                <SelectItem value="frontend_engineer">Frontend Engineer</SelectItem>
                                <SelectItem value="data_scientist">Data Scientist</SelectItem>
                                <SelectItem value="infrastruture_engineer">Infrastructure Engineer</SelectItem>
                                <SelectItem value="backend_engineer">Backend Engineer</SelectItem>
                            </SelectContent>
                        </Select>

                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Submit</Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default UploadResume
