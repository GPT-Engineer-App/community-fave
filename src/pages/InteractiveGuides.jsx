import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const guides = [
  { id: 1, title: "Using FileFlow", description: "Interactive guide on how to use FileFlow." },
  { id: 2, title: "Managing Containers", description: "Interactive guide on how to manage containers." },
  { id: 3, title: "Collaborating in ShareSphere", description: "Interactive guide on how to collaborate in ShareSphere." },
];

const InteractiveGuides = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Interactive Guides</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {guides.map((guide) => (
              <li key={guide.id} className="mb-4">
                <h3 className="text-lg font-bold">{guide.title}</h3>
                <p>{guide.description}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveGuides;