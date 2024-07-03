import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  verificationDocument: z.any().optional(),
  certifications: z.array(
    z.object({
      name: z.string().min(1, "Certification name is required"),
      organization: z.string().min(1, "Issuing organization is required"),
      date: z.string().min(1, "Date of issue is required"),
      certificate: z.any().optional(),
    })
  ).optional(),
});

const UserProfile = () => {
  const [certifications, setCertifications] = useState([]);
  const [trustScore, setTrustScore] = useState(0);
  const [badges, setBadges] = useState([]);

  const form = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      verificationDocument: null,
      certifications: [],
    },
  });

  const calculateTrustScore = (data) => {
    let score = 0;
    if (data.name) score += 10;
    if (data.email) score += 20;
    if (data.phone) score += 20;
    if (data.verificationDocument) score += 50;
    if (data.certifications && data.certifications.length > 0) {
      score += data.certifications.length * 10;
    }
    return score;
  };

  const assignBadges = (score) => {
    const newBadges = [];
    if (score >= 100) newBadges.push("Gold");
    else if (score >= 70) newBadges.push("Silver");
    else if (score >= 40) newBadges.push("Bronze");
    return newBadges;
  };

  const onSubmit = (data) => {
    const score = calculateTrustScore(data);
    setTrustScore(score);
    setBadges(assignBadges(score));
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="verificationDocument"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Document</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label>Certifications</Label>
                {certifications.map((cert, index) => (
                  <div key={index} className="space-y-2">
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certification Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Certification Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.organization`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issuing Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Issuing Organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Issue</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.certificate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Certificate</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => setCertifications([...certifications, {}])}
                >
                  Add Certification
                </Button>
              </div>
              <Button type="submit">Save Profile</Button>
            </form>
          </Form>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Trust Score: {trustScore}</h2>
            <div className="flex space-x-2">
              {badges.map((badge, index) => (
                <Badge key={index} variant="outline">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;