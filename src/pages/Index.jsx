import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Container from "@/models/Container";

const Index = () => {
  const navigate = useNavigate();

  // Example usage of Container model
  const exampleContainer = new Container({
    name: "Example Container",
    description: "This is an example container",
    contentMetadata: { type: "example" },
  });

  return (
    <div className="text-center bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Welcome to WelcomeHub</h1>
      <p className="text-lg text-gray-700 mb-8">Your go-to platform for secure and seamless file sharing and real-time collaboration.</p>
      <Button variant="primary" className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => navigate("/fileflow")}>Explore FileFlow</Button>
      <div className="mt-8 p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Example Container</h2>
        <p className="text-gray-600">Name: {exampleContainer.name}</p>
        <p className="text-gray-600">Description: {exampleContainer.description}</p>
        <p className="text-gray-600">Type: {exampleContainer.contentMetadata.type}</p>
      </div>
      <div className="mt-8">
        <Button variant="secondary" className="bg-gray-300 text-gray-800 py-2 px-4 rounded" onClick={() => navigate("/resource-library")}>Resource Library</Button>
        <Button variant="secondary" className="bg-gray-300 text-gray-800 py-2 px-4 rounded ml-2" onClick={() => navigate("/interactive-guides")}>Interactive Guides</Button>
        <Button variant="secondary" className="bg-gray-300 text-gray-800 py-2 px-4 rounded ml-2" onClick={() => navigate("/orientation-sessions")}>Orientation Sessions</Button>
      </div>
    </div>
  );
};

export default Index;