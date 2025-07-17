import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, LogOut, Eye, Settings, Lock } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("gpa_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("gpa_user");
    toast({
      title: "Logged out successfully",
      description: "You have been securely logged out.",
    });
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-auth flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-auth p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-glow">
              <Shield className="w-10 h-10 text-accent-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">GPA Dashboard</h1>
          <p className="text-muted-foreground">Secure Graphical Password Authentication</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-card/95 backdrop-blur border-border/50 shadow-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Account Information
              </CardTitle>
              <CardDescription>Your GPA account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Username:</span>
                <Badge variant="secondary">{user.username}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Password Images:</span>
                <Badge variant="outline">{user.imagePassword?.length || 0} selected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Security Level:</span>
                <Badge className="bg-accent text-accent-foreground">High</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-border/50 shadow-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Features
              </CardTitle>
              <CardDescription>Your authentication is protected by</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-sm">Visual password recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-sm">Sequential image verification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-sm">Cryptographic hashing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-sm">Secure session management</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/95 backdrop-blur border-border/50 shadow-glow mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Manage your account and security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/register")}
                className="flex-1 min-w-[200px]"
              >
                <Eye className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="flex-1 min-w-[200px]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Your graphical password provides enhanced security through visual recognition patterns.
          </p>
        </div>
      </div>
    </div>
  );
}