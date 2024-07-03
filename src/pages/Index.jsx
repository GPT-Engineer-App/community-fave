import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to KnowShare</h1>
      <p className="mb-6">Your go-to platform for high-quality content and personalized learning paths.</p>
      <Button onClick={() => navigate("/content")}>Explore Content</Button>
    </div>
  );
};

export default Index;