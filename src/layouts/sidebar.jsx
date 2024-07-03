import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircleUser, Menu, BookOpen, Home, User, UserPlus, LogIn, Box, Shield, FileText } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx"; // Import useSupabaseAuth

const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "User Profile",
    to: "/user-profile",
    icon: <User className="h-4 w-4" />,
  },
  {
    title: "Register", // Add Register to navigation
    to: "/register",
    icon: <UserPlus className="h-4 w-4" />,
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
  {
    title: "KnowShare", // Add KnowShare to navigation
    to: "/knowshare",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    title: "TrustExpert", // Add TrustExpert to navigation
    to: "/trustexpert",
    icon: <Shield className="h-4 w-4" />,
  },
  {
    title: "FileFlow", // Add FileFlow to navigation
    to: "/fileflow",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "TradeCircle", // Add TradeCircle to navigation
    to: "/tradecircle",
    icon: <Box className="h-4 w-4" />,
  },
  {
    title: "ShareSphere", // Add ShareSphere to navigation
    to: "/sharesphere",
    icon: <Box className="h-4 w-4" />,
  },
  {
    title: "Onboarding", // Add Onboarding to navigation
    to: "/onboarding",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    title: "Mentorship Pairings", // Add Mentorship Pairings to navigation
    to: "/mentorship-pairings",
    icon: <User className="h-4 w-4" />,
  },
  {
    title: "Progress Dashboard", // Add Progress Dashboard to navigation
    to: "/progress-dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "User Dashboard", // Add User Dashboard to navigation
    to: "/user-dashboard",
    icon: <Home className="h-4 w-4" />,
  },
];

const Layout = () => {
  const { session, logout } = useSupabaseAuth(); // Get session and logout function

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar session={session} />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar session={session} />
          <div className="w-full flex-1">{/* Add nav bar content here! */}</div>
          <UserDropdown session={session} logout={logout} />
        </header>
        <main className="flex-grow p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const Sidebar = ({ session }) => (
  <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <span>WelcomeHub</span>
        </NavLink>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
          {navItems.map((item) => (
            <SidebarNavLink key={item.to} to={item.to}>
              {item.icon}
              {item.title}
            </SidebarNavLink>
          ))}
        </nav>
      </div>
    </div>
  </div>
);

const MobileSidebar = ({ session }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="flex flex-col">
      <nav className="grid gap-2 text-lg font-medium">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-semibold mb-4"
        >
          <BookOpen className="h-6 w-6" />
          <span>WelcomeHub</span>
        </NavLink>
        {navItems.map((item) => (
          <SidebarNavLink key={item.to} to={item.to}>
            {item.title}
          </SidebarNavLink>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);

const UserDropdown = ({ session, logout }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      {session ? (
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      ) : (
        <DropdownMenuItem as={NavLink} to="/login">Login</DropdownMenuItem>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
);

const SidebarNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
        isActive && "text-primary bg-muted",
      )
    }
  >
    {children}
  </NavLink>
);

export default Layout;