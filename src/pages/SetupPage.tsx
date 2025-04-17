
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Palette, Mail, User, Shield } from "lucide-react";

// Define the form schema with validation
const setupFormSchema = z.object({
  // Account Information
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  isAdmin: z.boolean().default(true),
  salary: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Salary must be a valid number.",
  }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  
  // Company Branding
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  logoUrl: z.string().optional(),
  primaryColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { 
    message: "Please enter a valid hex color code (e.g., #9b87f5)." 
  }).default("#9b87f5"),
  
  // SMTP Settings
  smtpServer: z.string().optional(),
  smtpPort: z.string().refine(val => !val || (!isNaN(Number(val)) && Number(val) > 0), {
    message: "Port must be a valid number.",
  }).optional(),
  smtpUsername: z.string().optional(),
  smtpPassword: z.string().optional(),
  smtpFromEmail: z.string().email({ message: "Please enter a valid email address." }).optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SetupFormValues = z.infer<typeof setupFormSchema>;

const SetupPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState("account");
  
  // Define default form values
  const defaultValues: Partial<SetupFormValues> = {
    name: "",
    email: "",
    isAdmin: true,
    salary: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    logoUrl: "",
    primaryColor: "#9b87f5",
    smtpServer: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    smtpFromEmail: ""
  };
  
  const form = useForm<SetupFormValues>({
    resolver: zodResolver(setupFormSchema),
    defaultValues,
  });

  const onSubmit = (data: SetupFormValues) => {
    setIsSubmitting(true);
    
    // In a real application, this would send the data to your backend
    console.log("Setup data:", data);
    
    // Simulate API call
    setTimeout(() => {
      // Store the tenant data in localStorage to mark system as set up
      const userData = {
        id: "1",
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        salary: data.salary
      };
      
      // Store the user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Store system configuration
      const systemConfig = {
        companyName: data.companyName,
        primaryColor: data.primaryColor,
        logoUrl: data.logoUrl || '/placeholder.svg',
        smtpConfigured: !!data.smtpServer,
        setupComplete: true
      };
      
      localStorage.setItem('systemConfig', JSON.stringify(systemConfig));
      
      toast({
        title: "Setup complete!",
        description: "Your system has been configured successfully.",
      });
      
      // Navigate to login page
      navigate('/login');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  const nextTab = () => {
    if (currentTab === "account") {
      // Validate account fields before moving to next tab
      const accountFields = ["name", "email", "password", "confirmPassword"];
      const hasErrors = accountFields.some(field => !!form.formState.errors[field as keyof SetupFormValues]);
      
      if (!hasErrors) {
        setCurrentTab("branding");
      } else {
        // Trigger validation to show errors
        form.trigger(accountFields as any);
      }
    } else if (currentTab === "branding") {
      setCurrentTab("smtp");
    }
  };

  const prevTab = () => {
    if (currentTab === "branding") {
      setCurrentTab("account");
    } else if (currentTab === "smtp") {
      setCurrentTab("branding");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Budget Savvy</h1>
          <p className="text-muted-foreground">Initial System Setup</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>
              Configure your Budget Savvy instance - this setup will only appear once
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4 mx-6">
                  <TabsTrigger value="account" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Admin Account</span>
                  </TabsTrigger>
                  <TabsTrigger value="branding" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span>Branding</span>
                  </TabsTrigger>
                  <TabsTrigger value="smtp" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>SMTP Settings</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">Administrator Account</h3>
                    </div>
                    <Separator className="my-2" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="isAdmin"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Administrator</FormLabel>
                            <FormDescription>
                              Grant administrator privileges
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5">$</span>
                              <Input
                                type="text"
                                inputMode="numeric"
                                className="pl-7"
                                placeholder="0.00"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Used for budget recommendations
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-2" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Create a password" {...field} />
                            </FormControl>
                            <FormDescription>
                              At least 8 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="button" onClick={nextTab}>Next</Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="branding">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">Company Branding</h3>
                    </div>
                    <Separator className="my-2" />
                    
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="logoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <div className="flex gap-4 items-start">
                              <div className="flex-1">
                                <Input placeholder="Enter logo URL" {...field} />
                              </div>
                              <div className="w-16 h-16 border rounded flex items-center justify-center bg-gray-50">
                                {field.value ? (
                                  <img 
                                    src={field.value} 
                                    alt="Logo preview" 
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                      e.currentTarget.src = '/placeholder.svg';
                                    }}
                                  />
                                ) : (
                                  <Image className="w-8 h-8 text-gray-300" />
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            URL to your company logo (optional)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="primaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Color</FormLabel>
                          <FormControl>
                            <div className="flex gap-4 items-center">
                              <Input type="text" placeholder="#9b87f5" {...field} />
                              <input
                                type="color"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="w-10 h-10 p-1 border rounded cursor-pointer"
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Main color used throughout the application
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevTab}>Previous</Button>
                    <Button type="button" onClick={nextTab}>Next</Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="smtp">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">SMTP Server Settings</h3>
                    </div>
                    <Separator className="my-2" />
                    <p className="text-sm text-muted-foreground mb-4">
                      These settings are optional. Configure them to enable email notifications.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="smtpServer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Server</FormLabel>
                            <FormControl>
                              <Input placeholder="smtp.example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="smtpPort"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Port</FormLabel>
                            <FormControl>
                              <Input placeholder="587" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="smtpUsername"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="SMTP username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="smtpPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="SMTP password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="smtpFromEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="noreply@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Email address that will appear as the sender
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevTab}>Previous</Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Setting up..." : "Complete Setup"}
                    </Button>
                  </CardFooter>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default SetupPage;
