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

### user_profile

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| email      | text        | string | true     |
| phone      | text        | string | true     |
| created_at | timestamptz | string | true     |
| projects_managed | int8[] | array | false    |
| projects_contributed | int8[] | array | false |
| transactions_initiated | int8[] | array | false |
| endorsements_received | int8[] | array | false |

### project

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| description | text       | string | true     |
| created_at | timestamptz | string | true     |
| associated_documents | int8[] | array | false |
| linked_multimedia_files | int8[] | array | false |
| related_transactions | int8[] | array | false |
| involved_users | int8[] | array | false |

### document

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| content    | text        | string | true     |
| created_at | timestamptz | string | true     |
| linked_projects | int8[] | array | false |
| related_multimedia_files | int8[] | array | false |
| referenced_transactions | int8[] | array | false |

### multimedia_file

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| url        | text        | string | true     |
| created_at | timestamptz | string | true     |
| linked_projects | int8[] | array | false |
| associated_documents | int8[] | array | false |
| referenced_transactions | int8[] | array | false |

### transaction

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| amount     | numeric     | number | true     |
| created_at | timestamptz | string | true     |
| linked_projects | int8[] | array | false |
| involved_users | int8[] | array | false |
| associated_documents | int8[] | array | false |
| associated_multimedia | int8[] | array | false |

*/

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

// Hooks for project table
export const useProjects = () => useQuery({
    queryKey: ['projects'],
    queryFn: () => fromSupabase(supabase.from('project').select('*')),
});
export const useProject = (id) => useQuery({
    queryKey: ['project', id],
    queryFn: () => fromSupabase(supabase.from('project').select('*').eq('id', id).single()),
});
export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject) => fromSupabase(supabase.from('project').insert([newProject])),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};
export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProject) => fromSupabase(supabase.from('project').update(updatedProject).eq('id', updatedProject.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};
export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('project').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

// Hooks for document table
export const useDocuments = () => useQuery({
    queryKey: ['documents'],
    queryFn: () => fromSupabase(supabase.from('document').select('*')),
});
export const useDocument = (id) => useQuery({
    queryKey: ['document', id],
    queryFn: () => fromSupabase(supabase.from('document').select('*').eq('id', id).single()),
});
export const useAddDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDocument) => fromSupabase(supabase.from('document').insert([newDocument])),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};
export const useUpdateDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedDocument) => fromSupabase(supabase.from('document').update(updatedDocument).eq('id', updatedDocument.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};
export const useDeleteDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('document').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};

// Hooks for multimedia_file table
export const useMultimediaFiles = () => useQuery({
    queryKey: ['multimedia_files'],
    queryFn: () => fromSupabase(supabase.from('multimedia_file').select('*')),
});
export const useMultimediaFile = (id) => useQuery({
    queryKey: ['multimedia_file', id],
    queryFn: () => fromSupabase(supabase.from('multimedia_file').select('*').eq('id', id).single()),
});
export const useAddMultimediaFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMultimediaFile) => fromSupabase(supabase.from('multimedia_file').insert([newMultimediaFile])),
        onSuccess: () => {
            queryClient.invalidateQueries('multimedia_files');
        },
    });
};
export const useUpdateMultimediaFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedMultimediaFile) => fromSupabase(supabase.from('multimedia_file').update(updatedMultimediaFile).eq('id', updatedMultimediaFile.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('multimedia_files');
        },
    });
};
export const useDeleteMultimediaFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('multimedia_file').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('multimedia_files');
        },
    });
};

// Hooks for transaction table
export const useTransactions = () => useQuery({
    queryKey: ['transactions'],
    queryFn: () => fromSupabase(supabase.from('transaction').select('*')),
});
export const useTransaction = (id) => useQuery({
    queryKey: ['transaction', id],
    queryFn: () => fromSupabase(supabase.from('transaction').select('*').eq('id', id).single()),
});
export const useAddTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTransaction) => fromSupabase(supabase.from('transaction').insert([newTransaction])),
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
    });
};
export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTransaction) => fromSupabase(supabase.from('transaction').update(updatedTransaction).eq('id', updatedTransaction.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
    });
};
export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('transaction').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
    });
};