import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const forumSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const ShareSphere = () => {
  const form = useForm({
    resolver: zodResolver(forumSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data) => {
    // Implement forum post submission logic here
    toast("Forum post submitted successfully!");
    form.reset();
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="forum">
        <TabsList>
          <TabsTrigger value="forum">Community Forum</TabsTrigger>
          <TabsTrigger value="collaboration">Real-Time Collaboration</TabsTrigger>
          <TabsTrigger value="project-management">Project Management</TabsTrigger>
        </TabsList>
        <TabsContent value="forum">
          <Card>
            <CardHeader>
              <CardTitle>Community Forum</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Content" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="collaboration">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Real-time collaboration tools will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="project-management">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Project management features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShareSphere;