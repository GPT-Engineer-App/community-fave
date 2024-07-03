import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const fetchUserActivities = async () => {
  const { data, error } = await supabase.from("activities").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const fetchNotifications = async () => {
  const { data, error } = await supabase.from("notifications").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const fetchRecommendations = async () => {
  const { data, error } = await supabase.from("recommendations").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const fetchProgress = async () => {
  const { data, error } = await supabase.from("progress").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const UserDashboard = () => {
  const { data: activities, error: activitiesError, isLoading: isLoadingActivities } = useQuery({
    queryKey: ["activities"],
    queryFn: fetchUserActivities,
  });

  const { data: notifications, error: notificationsError, isLoading: isLoadingNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const { data: recommendations, error: recommendationsError, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendations,
  });

  const { data: progress, error: progressError, isLoading: isLoadingProgress } = useQuery({
    queryKey: ["progress"],
    queryFn: fetchProgress,
  });

  if (activitiesError || notificationsError || recommendationsError || progressError) {
    toast.error("Error fetching data");
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">User Activities</TabsTrigger>
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
              {isLoadingActivities ? (
                <Skeleton className="h-6 w-full mb-4" count={5} />
              ) : (
                <ul>
                  {activities?.map((activity) => (
                    <li key={activity.id} className="mb-4">
                      <h3 className="text-lg font-bold">{activity.title}</h3>
                      <p>{activity.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingNotifications ? (
                <Skeleton className="h-6 w-full mb-4" count={5} />
              ) : (
                <ul>
                  {notifications?.map((notification) => (
                    <li key={notification.id} className="mb-4">
                      <h3 className="text-lg font-bold">{notification.title}</h3>
                      <p>{notification.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingRecommendations ? (
                <Skeleton className="h-6 w-full mb-4" count={5} />
              ) : (
                <ul>
                  {recommendations?.map((recommendation) => (
                    <li key={recommendation.id} className="mb-4">
                      <h3 className="text-lg font-bold">{recommendation.title}</h3>
                      <p>{recommendation.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingProgress ? (
                <Skeleton className="h-6 w-full mb-4" count={5} />
              ) : (
                <ul>
                  {progress?.map((item) => (
                    <li key={item.id} className="mb-4">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <Progress value={item.progress} />
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;