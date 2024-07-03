import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, User, LogIn, Box } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // available: default, navbar, sidebar
import UserProfile from "./pages/UserProfile.jsx"; // Import UserProfile page
import Index from "./pages/Index.jsx";
import Register from "./pages/Register.jsx"; // Import Register page
import Login from "./pages/Login.jsx"; // Import Login page
import ContainerManagement from "./pages/ContainerManagement.jsx"; // Import ContainerManagement page
import { SupabaseAuthProvider } from "./integrations/supabase/auth.jsx"; // Import SupabaseAuthProvider
import KnowShare from "./pages/KnowShare.jsx"; // Import KnowShare page
import TrustExpert from "./pages/TrustExpert.jsx"; // Import TrustExpert page

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home", // Feel free to change this to your liking
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "User Profile", // Add User Profile to navigation
    to: "/user-profile",
    icon: <User className="h-4 w-4" />,
  },
  {
    title: "Register", // Add Register to navigation
    to: "/register",
    icon: <User className="h-4 w-4" />,
  },
  {
    title: "Login", // Add Login to navigation
    to: "/login",
    icon: <LogIn className="h-4 w-4" />,
  },
  {
    title: "Containers", // Add Container Management to navigation
    to: "/containers",
    icon: <Box className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SupabaseAuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="user-profile" element={<UserProfile />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="containers" element={<ContainerManagement />} />
                <Route path="knowshare" element={<KnowShare />} />
                <Route path="trustexpert" element={<TrustExpert />} />
              </Route>
            </Routes>
          </Router>
        </SupabaseAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;