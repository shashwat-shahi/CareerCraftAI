import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

export default PersonalInfo