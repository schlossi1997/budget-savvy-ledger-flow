
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send a reset password email
    // For this demo, we'll just show a success message
    setSubmitted(true);
    toast({
      title: "Password reset email sent",
      description: `Instructions have been sent to ${email}`,
    });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Budget Savvy</h1>
          <p className="text-muted-foreground">Manage your finances wisely</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{submitted ? "Check Your Email" : "Reset Password"}</CardTitle>
            <CardDescription>
              {submitted 
                ? "We've sent you an email with instructions to reset your password." 
                : "Enter your email address and we'll send you a link to reset your password."}
            </CardDescription>
          </CardHeader>
          
          {submitted ? (
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Didn't receive an email? Check your spam folder or try again.
              </p>
            </CardContent>
          ) : (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full">Send Reset Link</Button>
              </CardFooter>
            </form>
          )}
          
          <div className="px-6 pb-6">
            <Link to="/login" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
