import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";
import { useUserProfile, useProjects, useMessages, useForumPosts, useNotifications } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const UserDashboard = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const [activityOverview, setActivityOverview] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [progress, setProgress] = useState(0);

  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile(session?.user?.id);
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const { data: messages, isLoading: isLoadingMessages } = useMessages();
  const { data: forumPosts, isLoading: isLoadingForumPosts } = useForumPosts();
  const { data: userNotifications, isLoading: isLoadingNotifications } = useNotifications();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  useEffect(() => {
    if (userProfile && projects && messages && forumPosts && userNotifications) {
      setActivityOverview([...messages, ...forumPosts, ...projects]);
      setNotifications(userNotifications);
      setRecommendations([...projects, ...forumPosts]);
      setProgress(calculateProgress(projects));
    }
  }, [userProfile, projects, messages, forumPosts, userNotifications]);

  const calculateProgress = (projects) => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(project => project.current_status === "completed").length;
    return (completedProjects / totalProjects) * 100;
  };

  if (isLoadingProfile || isLoadingProjects || isLoadingMessages || isLoadingForumPosts || isLoadingNotifications) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Activity Overview</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {activityOverview.map((activity, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="text-lg font-bold">{activity.title}</h3>
                    <p>{activity.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="text-lg font-bold">{notification.title}</h3>
                    <p>{notification.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="text-lg font-bold">{recommendation.title}</h3>
                    <p>{recommendation.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} />
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Ongoing Projects</h2>
                <ul>
                  {projects.map((project) => (
                    <li key={project.id} className="mb-4">
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <p>{project.description}</p>
                      <p>Status: {project.current_status}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;