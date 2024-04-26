
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

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

export default Skills;