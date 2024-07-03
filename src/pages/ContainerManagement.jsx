import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContainers, useAddContainer, useUpdateContainer, useDeleteContainer } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const containerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

const ContainerManagement = () => {
  const [selectedContainer, setSelectedContainer] = useState(null);
  const { data: containers, isLoading, error } = useContainers();
  const { mutate: addContainer } = useAddContainer();
  const { mutate: updateContainer } = useUpdateContainer();
  const { mutate: deleteContainer } = useDeleteContainer();

  const form = useForm({
    resolver: zodResolver(containerSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    if (selectedContainer) {
      updateContainer({ ...data, id: selectedContainer.id }, {
        onSuccess: () => {
          toast("Container updated successfully!");
          form.reset();
          setSelectedContainer(null);
        },
        onError: (error) => {
          toast.error(`Error: ${error.message}`);
        },
      });
    } else {
      addContainer(data, {
        onSuccess: () => {
          toast("Container added successfully!");
          form.reset();
        },
        onError: (error) => {
          toast.error(`Error: ${error.message}`);
        },
      });
    }
  };

  const handleEdit = (container) => {
    setSelectedContainer(container);
    form.setValue("name", container.name);
    form.setValue("description", container.description);
  };

  const handleDelete = (id) => {
    deleteContainer(id, {
      onSuccess: () => {
        toast("Container deleted successfully!");
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading containers</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{selectedContainer ? "Edit Container" : "Add Container"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{selectedContainer ? "Update" : "Add"} Container</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Containers</h2>
        <ul>
          {containers.map((container) => (
            <li key={container.id} className="flex justify-between items-center p-2 border-b">
              <div>
                <h3 className="text-lg font-bold">{container.name}</h3>
                <p>{container.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => handleEdit(container)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(container.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContainerManagement;