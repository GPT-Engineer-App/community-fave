import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SupabaseAuthUI, useSupabaseAuth } from "@/integrations/supabase/auth.jsx";

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <SupabaseAuthUI />
    </div>
  );
};

export default Login;