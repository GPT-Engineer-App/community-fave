import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const feedbackSchema = z.object({
  feedback: z.string().min(1, "Feedback is required"),
});

const ProgressDashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Profile", completed: false },
    { id: 2, title: "Explore FileFlow", completed: false },
    { id: 3, title: "Join a Community Group", completed: false },
  ]);
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Profile Completion", completed: false },
    { id: 2, title: "First File Shared", completed: false },
  ]);
  const [progress, setProgress] = useState(0);

  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      feedback: "",
    },
  });

  useEffect(() => {
    const totalTasks = tasks.length + milestones.length;
    const completedTasks = tasks.filter(task => task.completed).length + milestones.filter(milestone => milestone.completed).length;
    setProgress((completedTasks / totalTasks) * 100);
  }, [tasks, milestones]);

  const handleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const handleMilestoneCompletion = (milestoneId) => {
    setMilestones(milestones.map(milestone => milestone.id === milestoneId ? { ...milestone, completed: !milestone.completed } : milestone));
  };

  const onSubmit = (data) => {
    toast("Feedback submitted successfully!");
    form.reset();
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <ul>
              {tasks.map(task => (
                <li key={task.id} className="flex justify-between items-center p-2 border-b">
                  <span>{task.title}</span>
                  <Button variant="outline" onClick={() => handleTaskCompletion(task.id)}>
                    {task.completed ? "Undo" : "Complete"}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Milestones</h2>
            <ul>
              {milestones.map(milestone => (
                <li key={milestone.id} className="flex justify-between items-center p-2 border-b">
                  <span>{milestone.title}</span>
                  <Button variant="outline" onClick={() => handleMilestoneCompletion(milestone.id)}>
                    {milestone.completed ? "Undo" : "Complete"}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your feedback" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit Feedback</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDashboard;