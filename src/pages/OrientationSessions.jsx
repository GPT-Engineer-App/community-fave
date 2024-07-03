import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sessions = [
  { id: 1, title: "Welcome to WelcomeHub", description: "Introduction to WelcomeHub and its features.", date: "Every Monday at 10 AM" },
  { id: 2, title: "Getting Started with FileFlow", description: "Learn how to use FileFlow for file sharing.", date: "Every Wednesday at 2 PM" },
  { id: 3, title: "Collaborating in ShareSphere", description: "Introduction to collaboration features in ShareSphere.", date: "Every Friday at 4 PM" },
];

const OrientationSessions = () => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Orientation Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {sessions.map((session) => (
              <li key={session.id} className="mb-4">
                <h3 className="text-lg font-bold">{session.title}</h3>
                <p>{session.description}</p>
                <p>Date: {session.date}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrientationSessions;