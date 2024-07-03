import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const fetchForumActivity = async () => {
  const { data, error } = await supabase.from("forum_activity").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const fetchEventCalendar = async () => {
  const { data, error } = await supabase.from("event_calendar").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const fetchUserContributions = async () => {
  const { data, error } = await supabase.from("user_contributions").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const fetchKnowledgeSharing = async () => {
  const { data, error } = await supabase.from("knowledge_sharing").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const CommunityDashboard = () => {
  const { data: forumActivity, error: forumActivityError } = useQuery({
    queryKey: ["forumActivity"],
    queryFn: fetchForumActivity,
  });

  const { data: eventCalendar, error: eventCalendarError } = useQuery({
    queryKey: ["eventCalendar"],
    queryFn: fetchEventCalendar,
  });

  const { data: userContributions, error: userContributionsError } = useQuery({
    queryKey: ["userContributions"],
    queryFn: fetchUserContributions,
  });

  const { data: knowledgeSharing, error: knowledgeSharingError } = useQuery({
    queryKey: ["knowledgeSharing"],
    queryFn: fetchKnowledgeSharing,
  });

  if (forumActivityError || eventCalendarError || userContributionsError || knowledgeSharingError) {
    toast.error("Error fetching data");
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="forumActivity">
        <TabsList>
          <TabsTrigger value="forumActivity">Forum Activity</TabsTrigger>
          <TabsTrigger value="eventCalendar">Event Calendar</TabsTrigger>
          <TabsTrigger value="userContributions">User Contributions</TabsTrigger>
          <TabsTrigger value="knowledgeSharing">Knowledge Sharing</TabsTrigger>
        </TabsList>
        <TabsContent value="forumActivity">
          <Card>
            <CardHeader>
              <CardTitle>Forum Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {forumActivity?.map((activity) => (
                  <li key={activity.id} className="mb-4">
                    <h3 className="text-lg font-bold">{activity.title}</h3>
                    <p>{activity.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="eventCalendar">
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {eventCalendar?.map((event) => (
                  <li key={event.id} className="mb-4">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Date: {event.date}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="userContributions">
          <Card>
            <CardHeader>
              <CardTitle>User Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {userContributions?.map((contribution) => (
                  <li key={contribution.id} className="mb-4">
                    <h3 className="text-lg font-bold">{contribution.user}</h3>
                    <p>{contribution.contribution}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="knowledgeSharing">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {knowledgeSharing?.map((item) => (
                  <li key={item.id} className="mb-4">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityDashboard;