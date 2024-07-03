import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const assessmentSchema = z.object({
  goals: z.string().min(1, "Goals are required"),
  interests: z.string().min(1, "Interests are required"),
  skillLevel: z.string().min(1, "Skill level is required"),
});

const Onboarding = () => {
  const [onboardingPlan, setOnboardingPlan] = useState(null);

  const form = useForm({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      goals: "",
      interests: "",
      skillLevel: "",
    },
  });

  const generateOnboardingPlan = (data) => {
    // Logic to generate personalized onboarding plan based on user assessment
    const plan = {
      tasks: [
        { id: 1, title: "Complete Profile", completed: false },
        { id: 2, title: "Explore FileFlow", completed: false },
        { id: 3, title: "Join a Community Group", completed: false },
      ],
      tutorials: [
        { id: 1, title: "WelcomeHub Overview", completed: false },
        { id: 2, title: "Using FileFlow", completed: false },
      ],
    };
    setOnboardingPlan(plan);
  };

  const onSubmit = (data) => {
    generateOnboardingPlan(data);
    toast("Onboarding plan generated successfully!");
  };

  const markTaskAsComplete = (taskId) => {
    setOnboardingPlan((prevPlan) => ({
      ...prevPlan,
      tasks: prevPlan.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goals</FormLabel>
                    <FormControl>
                      <Input placeholder="Goals" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="Interests" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skillLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Level</FormLabel>
                    <FormControl>
                      <Input placeholder="Skill Level" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Generate Onboarding Plan</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {onboardingPlan && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Your Onboarding Plan</h2>
          <div className="mt-2">
            <h3 className="text-lg font-bold">Tasks</h3>
            <ul>
              {onboardingPlan.tasks.map((task) => (
                <li key={task.id} className="flex justify-between items-center p-2 border-b">
                  <span>{task.title}</span>
                  <Button variant="outline" onClick={() => markTaskAsComplete(task.id)}>
                    {task.completed ? "Undo" : "Complete"}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-bold">Tutorials</h3>
            <ul>
              {onboardingPlan.tutorials.map((tutorial) => (
                <li key={tutorial.id} className="flex justify-between items-center p-2 border-b">
                  <span>{tutorial.title}</span>
                  <Button variant="outline">
                    {tutorial.completed ? "Redo" : "Start"}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;