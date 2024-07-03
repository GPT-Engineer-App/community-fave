import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./index.js";

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useAuditLogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newLog) => fromSupabase(supabase.from("audit_logs").insert([newLog])),
    onSuccess: () => {
      queryClient.invalidateQueries("audit_logs");
    },
  });
};