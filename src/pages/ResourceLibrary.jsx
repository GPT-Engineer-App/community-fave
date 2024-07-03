import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const resources = [
  { id: 1, title: "Getting Started Guide", description: "Learn how to get started with WelcomeHub." },
  { id: 2, title: "FAQ", description: "Frequently Asked Questions about WelcomeHub." },
  { id: 3, title: "Tutorials", description: "Step-by-step tutorials on using WelcomeHub features." },
];

const ResourceLibrary = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Resource Library</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {resources.map((resource) => (
              <li key={resource.id} className="mb-4">
                <h3 className="text-lg font-bold">{resource.title}</h3>
                <p>{resource.description}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceLibrary;