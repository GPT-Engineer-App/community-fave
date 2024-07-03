import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAddMentorship, useMentorships, useUpdateMentorship, useDeleteMentorship } from "@/integrations/supabase/index.js";
import { toast } from "sonner";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";

const mentorshipSchema = z.object({
  goals: z.string().min(1, "Goals are required"),
  interests: z.string().min(1, "Interests are required"),
  expertise: z.string().min(1, "Expertise is required"),
});

const MentorshipPairings = () => {
  const { data: mentorships, isLoading, error } = useMentorships();
  const { mutate: addMentorship } = useAddMentorship();
  const { mutate: updateMentorship } = useUpdateMentorship();
  const { mutate: deleteMentorship } = useDeleteMentorship();
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(mentorshipSchema),
    defaultValues: {
      goals: "",
      interests: "",
      expertise: "",
    },
  });

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const onSubmit = (data) => {
    addMentorship(data, {
      onSuccess: () => {
        toast("Mentorship added successfully!");
        form.reset();
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  const handleEdit = (mentorship) => {
    form.setValue("goals", mentorship.goals);
    form.setValue("interests", mentorship.interests);
    form.setValue("expertise", mentorship.expertise);
  };

  const handleDelete = (id) => {
    deleteMentorship(id, {
      onSuccess: () => {
        toast("Mentorship deleted successfully!");
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading mentorships</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Mentorship</CardTitle>
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
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expertise</FormLabel>
                    <FormControl>
                      <Input placeholder="Expertise" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add Mentorship</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Mentorships</h2>
        <ul>
          {mentorships.map((mentorship) => (
            <li key={mentorship.id} className="flex justify-between items-center p-2 border-b">
              <div>
                <h3 className="text-lg font-bold">{mentorship.goals}</h3>
                <p>{mentorship.interests}</p>
                <p>Expertise: {mentorship.expertise}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => handleEdit(mentorship)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(mentorship.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MentorshipPairings;