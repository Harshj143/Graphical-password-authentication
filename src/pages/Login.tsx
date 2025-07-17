import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageGrid } from "@/components/ImageGrid";
import { useToast } from "@/hooks/use-toast";
import { LogIn, User, Eye, CheckCircle } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [step, setStep] = useState<"username" | "password">("username");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter your username to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, you would verify the username exists
    // For demo purposes, we'll just continue
    setStep("password");
  };

  const handleImageSelect = (imageId: string) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        // Remove image if already selected (for reordering)
        return prev.filter(id => id !== imageId);
      } else if (prev.length < 5) {
        // Add image if under limit
        return [...prev, imageId];
      }
      return prev;
    });
  };

  const handleLogin = async () => {
    if (selectedImages.length !== 5) {
      toast({
        title: "Incomplete password",
        description: "Please select exactly 5 images for your password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, you would:
    // 1. Send username and selectedImages to your backend
    // 2. Backend creates hash of selectedImages and compares with stored hash
    // 3. Return authentication result

    // Demo authentication check
    const storedUser = localStorage.getItem("gpa_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.username === username && 
          JSON.stringify(userData.imagePassword) === JSON.stringify(selectedImages)) {
        toast({
          title: "Login successful!",
          description: "Welcome back to your account.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "User not found",
        description: "Please register first or check your username.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleBack = () => {
    setStep("username");
    setSelectedImages([]);
    // When going back, the ImageGrid will re-shuffle when step changes back to password
  };

  return (
    <div className="min-h-screen bg-gradient-auth flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-card/95 backdrop-blur border-border/50 shadow-glow">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-glow">
                <LogIn className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl">Welcome Back</CardTitle>
            <CardDescription>
              {step === "username" 
                ? "Enter your username to continue"
                : "Select your 5 image password in the correct order"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === "username" ? (
              <form onSubmit={handleUsernameSubmit} className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-center text-lg"
                    autoFocus
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Continue
                  <User className="w-4 h-4 ml-2" />
                </Button>
                
                <div className="text-center">
                  <Link to="/register" className="text-primary hover:underline">
                    Don't have an account? Register
                  </Link>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Hello, {username}!</h3>
                  <p className="text-muted-foreground">
                    Select the same 5 images you chose during registration in the same order.
                  </p>
                </div>

                <ImageGrid
                  key={step} // Force re-render and re-shuffle when step changes
                  onImageSelect={handleImageSelect}
                  selectedImages={selectedImages}
                  maxSelections={5}
                  mode="login"
                />

                <div className="flex gap-4 max-w-md mx-auto">
                  <Button 
                    variant="outline" 
                    onClick={handleBack} 
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleLogin} 
                    disabled={selectedImages.length !== 5 || isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Log In
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}