import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### event

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| created_at | timestamptz | string | true     |
| date       | date        | string | true     |

### user_profile

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| email      | text        | string | true     |
| phone      | text        | string | true     |
| created_at | timestamptz | string | true     |

### certification

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| user_id    | int8        | number | true     |
| name       | text        | string | true     |
| organization | text      | string | true     |
| date       | date        | string | true     |
| created_at | timestamptz | string | true     |

*/

// Hooks for event table
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('event').select('*')),
});
export const useEvent = (id) => useQuery({
    queryKey: ['event', id],
    queryFn: () => fromSupabase(supabase.from('event').select('*').eq('id', id).single()),
});
export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('event').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};
export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('event').update(updatedEvent).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};
export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for user_profile table
export const useUserProfiles = () => useQuery({
    queryKey: ['user_profiles'],
    queryFn: () => fromSupabase(supabase.from('user_profile').select('*')),
});
export const useUserProfile = (id) => useQuery({
    queryKey: ['user_profile', id],
    queryFn: () => fromSupabase(supabase.from('user_profile').select('*').eq('id', id).single()),
});
export const useAddUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUserProfile) => fromSupabase(supabase.from('user_profile').insert([newUserProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('user_profiles');
        },
    });
};
export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUserProfile) => fromSupabase(supabase.from('user_profile').update(updatedUserProfile).eq('id', updatedUserProfile.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_profiles');
        },
    });
};
export const useDeleteUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('user_profile').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_profiles');
        },
    });
};

// Hooks for certification table
export const useCertifications = () => useQuery({
    queryKey: ['certifications'],
    queryFn: () => fromSupabase(supabase.from('certification').select('*')),
});
export const useCertification = (id) => useQuery({
    queryKey: ['certification', id],
    queryFn: () => fromSupabase(supabase.from('certification').select('*').eq('id', id).single()),
});
export const useAddCertification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCertification) => fromSupabase(supabase.from('certification').insert([newCertification])),
        onSuccess: () => {
            queryClient.invalidateQueries('certifications');
        },
    });
};
export const useUpdateCertification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedCertification) => fromSupabase(supabase.from('certification').update(updatedCertification).eq('id', updatedCertification.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('certifications');
        },
    });
};
export const useDeleteCertification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('certification').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('certifications');
        },
    });
};