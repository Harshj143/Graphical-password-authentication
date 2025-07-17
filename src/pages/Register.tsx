import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageGrid } from "@/components/ImageGrid";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Lock, Eye } from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [step, setStep] = useState<"username" | "password">("username");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to continue.",
        variant: "destructive",
      });
      return;
    }
    if (username.length < 3) {
      toast({
        title: "Username too short",
        description: "Username must be at least 3 characters long.",
        variant: "destructive",
      });
      return;
    }
    setStep("password");
  };

  const handleImageSelect = (imageId: string) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        // Remove image if already selected
        return prev.filter(id => id !== imageId);
      } else if (prev.length < 5) {
        // Add image if under limit
        return [...prev, imageId];
      }
      return prev;
    });
  };

  const handleRegister = () => {
    if (selectedImages.length !== 5) {
      toast({
        title: "Incomplete password",
        description: "Please select exactly 5 images for your password.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, you would:
    // 1. Send username and selectedImages (array of IDs) to your backend
    // 2. Backend creates a hash of the combined IDs
    // 3. Store username and password hash in database
    
    console.log("Registration data:", { username, imagePassword: selectedImages });
    
    // Simulate successful registration
    toast({
      title: "Registration successful!",
      description: "Your account has been created. You can now log in.",
    });
    
    // Store registration data temporarily (in real app, this would be handled by backend)
    localStorage.setItem("gpa_user", JSON.stringify({ username, imagePassword: selectedImages }));
    
    navigate("/login");
  };

  const handleBack = () => {
    setStep("username");
    setSelectedImages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-auth flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-card/95 backdrop-blur border-border/50 shadow-glow">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-glow">
                <UserPlus className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl">Create Account</CardTitle>
            <CardDescription>
              {step === "username" 
                ? "Enter your username to get started"
                : "Select 5 images as your password"
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
                  <Lock className="w-4 h-4 ml-2" />
                </Button>
                
                <div className="text-center">
                  <Link to="/login" className="text-primary hover:underline">
                    Already have an account? Log in
                  </Link>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Welcome, {username}!</h3>
                  <p className="text-muted-foreground">
                    Choose 5 images that you'll remember. You'll need to select the same images in the same order to log in.
                  </p>
                </div>

                <ImageGrid
                  onImageSelect={handleImageSelect}
                  selectedImages={selectedImages}
                  maxSelections={5}
                  mode="register"
                />

                <div className="flex gap-4 max-w-md mx-auto">
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={handleRegister} 
                    disabled={selectedImages.length !== 5}
                    className="flex-1"
                  >
                    Create Account
                    <Eye className="w-4 h-4 ml-2" />
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