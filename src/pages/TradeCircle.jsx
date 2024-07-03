import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAddTransaction, useTransactions, useUpdateTransaction, useDeleteTransaction } from "@/integrations/supabase/index.js";
import { toast } from "sonner";
import { useSupabaseAuth } from "@/integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";
import { encryptData, decryptData } from "@/utils/encryption";
import { useAuditLogs } from "@/integrations/supabase/auditLogs";

const transactionSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  description: z.string().min(1, "Description is required"),
  value: z.number().min(1, "Value must be at least 1"),
  exchangeFor: z.string().min(1, "Exchange item is required"),
});

const TradeCircle = () => {
  const { data: transactions, isLoading, error } = useTransactions();
  const { mutate: addTransaction } = useAddTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();
  const { mutate: deleteTransaction } = useDeleteTransaction();
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const { addAuditLog } = useAuditLogs();

  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      itemName: "",
      description: "",
      value: 0,
      exchangeFor: "",
    },
  });

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const onSubmit = async (data) => {
    const encryptedData = encryptData(data);
    addTransaction(encryptedData, {
      onSuccess: () => {
        toast("Transaction added successfully!");
        form.reset();
        addAuditLog({
          action: "add_transaction",
          user: session.user.id,
          details: encryptedData,
        });
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  const handleEdit = (transaction) => {
    const decryptedData = decryptData(transaction);
    form.setValue("itemName", decryptedData.itemName);
    form.setValue("description", decryptedData.description);
    form.setValue("value", decryptedData.value);
    form.setValue("exchangeFor", decryptedData.exchangeFor);
  };

  const handleDelete = (id) => {
    deleteTransaction(id, {
      onSuccess: () => {
        toast("Transaction deleted successfully!");
        addAuditLog({
          action: "delete_transaction",
          user: session.user.id,
          details: { transactionId: id },
        });
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Item Name" {...field} />
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
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="exchangeFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exchange For</FormLabel>
                    <FormControl>
                      <Input placeholder="Exchange For" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add Transaction</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <ul>
          {transactions.map((transaction) => {
            const decryptedData = decryptData(transaction);
            return (
              <li key={transaction.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <h3 className="text-lg font-bold">{decryptedData.itemName}</h3>
                  <p>{decryptedData.description}</p>
                  <p>Value: {decryptedData.value}</p>
                  <p>Exchange For: {decryptedData.exchangeFor}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => handleEdit(transaction)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(transaction.id)}>Delete</Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TradeCircle;