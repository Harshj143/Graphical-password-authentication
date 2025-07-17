import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, UserPlus, LogIn, Eye, Lock, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-auth">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-glow">
              <Shield className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            GPA Authentication
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Next-generation security through Graphical Password Authentication. 
            Secure, intuitive, and memorable visual passwords.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/register">
                <UserPlus className="w-5 h-5 mr-2" />
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/login">
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card/95 backdrop-blur border-border/50 shadow-glow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Visual Recognition</CardTitle>
              <CardDescription>
                Remember patterns, not complex passwords
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Select 5 memorable images as your password. Your brain naturally recognizes visual patterns better than remembering complex text passwords.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-border/50 shadow-glow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Enhanced Security</CardTitle>
              <CardDescription>
                Cryptographic hashing meets visual authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Each image has a unique ID. Your selection creates a hash that's virtually impossible to guess, providing military-grade security.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-border/50 shadow-glow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Authenticate in seconds, not minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                No more typing complex passwords on mobile devices. Quick visual selection gets you authenticated instantly with a simple touch interface.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p className="text-muted-foreground">
                Choose your username and select 5 memorable images from our grid
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Remember</h3>
              <p className="text-muted-foreground">
                Your selected images become your unique visual password sequence
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-destructive">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Login</h3>
              <p className="text-muted-foreground">
                Select the same images in the same order to authenticate securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
