import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { fetchMyProfile } from "@/lib/profile";
import Home from "./pages/Home";
import About from "./pages/About";
import Games from "./pages/Games";
import GameOffers from "./pages/GameOffers";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
function ProtectedRoute({ session, children }: { session: Session | null; children: React.ReactNode }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Admin route component
function AdminRoute({ session, profile, children }: { session: Session | null; profile: any; children: React.ReactNode }) {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  if (profile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        // Defer profile fetch with setTimeout
        if (session?.user) {
          setTimeout(() => {
            fetchMyProfile().then(setProfile).catch(console.error);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchMyProfile().then(setProfile).catch(console.error);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home session={session} profile={profile} />} />
            <Route path="/about" element={<About session={session} profile={profile} />} />
            <Route path="/games" element={<Games session={session} profile={profile} />} />
            <Route path="/games/:slug" element={<GameOffers session={session} profile={profile} />} />
            <Route path="/reviews" element={<Reviews session={session} profile={profile} />} />
            <Route path="/login" element={session ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/signup" element={session ? <Navigate to="/" replace /> : <Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute session={session}>
                  <Dashboard session={session} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AdminRoute session={session} profile={profile}>
                  <Admin profile={profile} />
                </AdminRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
