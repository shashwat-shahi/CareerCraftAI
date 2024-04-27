import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Auth() {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Simulate login process
    setTimeout(() => {
      // Redirect to the root URL after a 5-second delay
      navigate('/');
    }, 5000);
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="right w-[60%] flex min-h-[90vh]">
          <Card className="self-center mx-auto">
            <CardHeader>
              <CardTitle className='mb-3'>Log In to Jumpstart Your Career</CardTitle>
              <CardDescription className='mb-5'>
                Securely log in now to start getting personalized resume feedback and discover exciting job opportunities tailored just for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Button onClick={handleLogin} disabled={isLoggingIn}>
                      {isLoggingIn ? 'Logging in...' : 'Google'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/auth.jpg"
          alt="auth"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width="1920"
          height="1080"
        />
      </div>
    </div>
  );
}

export default Auth;