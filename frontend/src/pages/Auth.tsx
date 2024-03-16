import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
   
function Auth() {
    const google_oauth_url = import.meta.env.VITE_GOOGLE_OAUTH_URL;
    console.log(google_oauth_url);
  return (
    <div className='wrapper flex overflow-hidden'>
        <div className='left w-[60%]'>
            <img src="/auth.jpg" alt="auth" />
        </div>
        <div className="right w-[40%] flex min-h-[90vh]">
            <Card className="w-[400px] self-center mx-auto">
                <CardHeader>
                    <div className='flex'>
                    <div className='w-[40px] m-4'><img src="logo.png" alt="" /></div>
                    <div className='text-3xl mb-3 text-center m-4'>CareerCraft AI</div>
                    </div>
                    <br />
                    <CardTitle className='mb-3'>Log In to Jumpstart Your Career</CardTitle>
                    <CardDescription className='mb-5'>Securely log in now to start getting personalized resume feedback and discover exciting job opportunities tailored just for you</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Button asChild>
                                <Link to={google_oauth_url}>Google</Link>
                            </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default Auth