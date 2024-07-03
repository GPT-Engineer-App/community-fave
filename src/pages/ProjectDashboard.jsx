import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/index.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const fetchProjectOverview = async () => {
  const { data, error } = await supabase.from("projects").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const fetchTeamActivities = async () => {
  const { data, error } = await supabase.from("team_activities").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const fetchResources = async () => {
  const { data, error } = await supabase.from("resources").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const fetchAnalytics = async () => {
  const { data, error } = await supabase.from("analytics").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const ProjectDashboard = () => {
  const { data: projectOverview, error: projectOverviewError, isLoading: isLoadingProjectOverview } = useQuery({
    queryKey: ["projectOverview"],
    queryFn: fetchProjectOverview,
  });

  const { data: teamActivities, error: teamActivitiesError, isLoading: isLoadingTeamActivities } = useQuery({
    queryKey: ["teamActivities"],
    queryFn: fetchTeamActivities,
  });

  const { data: resources, error: resourcesError, isLoading: isLoadingResources } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });

  const { data: analytics, error: analyticsError, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });

  if (projectOverviewError || teamActivitiesError || resourcesError || analyticsError) {
    toast.error("Error fetching data");
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Project Overview</TabsTrigger>
          <TabsTrigger value="team">Team Collaboration</TabsTrigger>
          <TabsTrigger value="resources">Resource Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reporting</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingProjectOverview ? (
                <Skeleton className="h-6 w-full mb-4" count={5} />
              ) : (
                <ul>
                  {projectOverview?.map((project) => (
                    <li key={project.id} className="mb-4">
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <p>{project.description}</p>
                      <p>Status: {project.current_status}</p>
                      <p>Start Date: {project.start_date}</p>
                      <p>End Date: {project.end_date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingTeamActivities ? (
                <Skeleton className="h-6 w-full mb-4" count={5} />
              ) : (
                <ul>
                  {teamActivities?.map((activity) => (
                    <li key={activity.id} className="mb-4">
                      <h3 className="text-lg font-bold">{activity.title}</h3>
                      <p>{activity.description}</p>
                      <p>Assigned to: {activity.assigned_to}</p>
                      <p>Due Date: {activity.due_date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource Management</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingResources ? (
                <Skeleton className="h-6 w-full mb-4" count={5} />
              ) : (
                <ul>
                  {resources?.map((resource) => (
                    <li key={resource.id} className="mb-4">
                      <h3 className="text-lg font-bold">{resource.title}</h3>
                      <p>{resource.description}</p>
                      <p>Allocated to: {resource.allocated_to}</p>
                      <p>Budget: {resource.budget}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAnalytics ? (
                <Skeleton className="h-6 w-full mb-4" count={5} />
              ) : (
                <ul>
                  {analytics?.map((item) => (
                    <li key={item.id} className="mb-4">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <Progress value={item.progress} />
                      <p>User Engagement: {item.user_engagement}</p>
                      <p>Task Completion Rate: {item.task_completion_rate}</p>
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

export default ProjectDashboard;