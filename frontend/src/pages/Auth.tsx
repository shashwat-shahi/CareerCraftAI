import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
   
function Auth() {
  return (
    <div className="flex min-h-[90vh]">
        <Card className="w-[400px] self-center mx-auto">
            <CardHeader>
                <CardTitle className='mb-3'>Log In to Jumpstart Your Career</CardTitle>
                <CardDescription className='mb-5'>Securely log in now to start getting personalized resume feedback and discover exciting job opportunities tailored just for you</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Button // @ts-ignore 
                            >
                                <Avatar>
                                    <AvatarImage src="/src/images/github_logo.svg" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                Github
                            </Button>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Button // @ts-ignore
                            variant="outline">
                                <Avatar>
                                    <AvatarImage src="/src/images/google_logo.svg" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                Google
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default Auth