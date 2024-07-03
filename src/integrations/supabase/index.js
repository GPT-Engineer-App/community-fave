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

### certifications

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| user_id    | int8        | number | true     |
| name       | text        | string | true     |
| organization | text      | string | true     |
| date       | timestamptz | string | true     |
| created_at | timestamptz | string | true     |

### transactions

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| project_id | int8        | number | true     |
| user_id    | int8        | number | true     |
| type       | text        | string | true     |
| amount     | numeric     | number | true     |
| date       | timestamptz | string | true     |
| created_at | timestamptz | string | true     |
| linked_projects | int8[] | array  | false    |
| involved_users | int8[]  | array  | false    |
| associated_documents_multimedia | int8[] | array | false |

### projects

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| title      | text        | string | true     |
| description | text       | string | true     |
| project_manager | int8   | number | true     |
| team_members | int8[]    | array  | false    |
| start_date | timestamptz | string | true     |
| end_date   | timestamptz | string | true     |
| current_status | text    | string | true     |
| objectives | text        | string | true     |
| milestones | text        | string | true     |
| budget     | numeric     | number | true     |
| created_at | timestamptz | string | true     |
| associated_documents | int8[] | array | false |
| linked_multimedia_files | int8[] | array | false |
| related_transactions | int8[] | array | false |
| involved_users | int8[]  | array  | false    |

### multimedia_files

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| project_id | int8        | number | true     |
| file_url   | text        | string | true     |
| file_type  | text        | string | true     |
| created_at | timestamptz | string | true     |
| linked_projects | int8[] | array  | false    |
| associated_documents | int8[] | array | false |
| referenced_transactions | int8[] | array | false |

### endorsements

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| user_id    | int8        | number | true     |
| endorsed_by | int8       | number | true     |
| endorsement_text | text  | string | true     |
| date       | timestamptz | string | true     |
| created_at | timestamptz | string | true     |

### documents

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| project_id | int8        | number | true     |
| title      | text        | string | true     |
| content    | text        | string | true     |
| created_at | timestamptz | string | true     |
| linked_projects | int8[] | array  | false    |
| related_multimedia_files | int8[] | array | false |
| referenced_transactions | int8[] | array | false |

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

*/

// Hooks for certifications
export const useCertifications = () => useQuery({
    queryKey: ['certifications'],
    queryFn: () => fromSupabase(supabase.from('certifications').select('*')),
});

export const useCertification = (id) => useQuery({
    queryKey: ['certification', id],
    queryFn: () => fromSupabase(supabase.from('certifications').select('*').eq('id', id).single()),
});

export const useAddCertification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCertification) => fromSupabase(supabase.from('certifications').insert([newCertification])),
        onSuccess: () => {
            queryClient.invalidateQueries('certifications');
        },
    });
};

export const useUpdateCertification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedCertification) => fromSupabase(supabase.from('certifications').update(updatedCertification).eq('id', updatedCertification.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('certifications');
        },
    });
};

export const useDeleteCertification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('certifications').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('certifications');
        },
    });
};

// Hooks for transactions
export const useTransactions = () => useQuery({
    queryKey: ['transactions'],
    queryFn: () => fromSupabase(supabase.from('transactions').select('*')),
});

export const useTransaction = (id) => useQuery({
    queryKey: ['transaction', id],
    queryFn: () => fromSupabase(supabase.from('transactions').select('*').eq('id', id).single()),
});

export const useAddTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTransaction) => fromSupabase(supabase.from('transactions').insert([newTransaction])),
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
    });
};

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTransaction) => fromSupabase(supabase.from('transactions').update(updatedTransaction).eq('id', updatedTransaction.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
    });
};

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('transactions').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('transactions');
        },
    });
};

// Hooks for projects
export const useProjects = () => useQuery({
    queryKey: ['projects'],
    queryFn: () => fromSupabase(supabase.from('projects').select('*')),
});

export const useProject = (id) => useQuery({
    queryKey: ['project', id],
    queryFn: () => fromSupabase(supabase.from('projects').select('*').eq('id', id).single()),
});

export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject) => fromSupabase(supabase.from('projects').insert([newProject])),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProject) => fromSupabase(supabase.from('projects').update(updatedProject).eq('id', updatedProject.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('projects').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

// Hooks for multimedia_files
export const useMultimediaFiles = () => useQuery({
    queryKey: ['multimedia_files'],
    queryFn: () => fromSupabase(supabase.from('multimedia_files').select('*')),
});

export const useMultimediaFile = (id) => useQuery({
    queryKey: ['multimedia_file', id],
    queryFn: () => fromSupabase(supabase.from('multimedia_files').select('*').eq('id', id).single()),
});

export const useAddMultimediaFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMultimediaFile) => fromSupabase(supabase.from('multimedia_files').insert([newMultimediaFile])),
        onSuccess: () => {
            queryClient.invalidateQueries('multimedia_files');
        },
    });
};

export const useUpdateMultimediaFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedMultimediaFile) => fromSupabase(supabase.from('multimedia_files').update(updatedMultimediaFile).eq('id', updatedMultimediaFile.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('multimedia_files');
        },
    });
};

export const useDeleteMultimediaFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('multimedia_files').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('multimedia_files');
        },
    });
};

// Hooks for endorsements
export const useEndorsements = () => useQuery({
    queryKey: ['endorsements'],
    queryFn: () => fromSupabase(supabase.from('endorsements').select('*')),
});

export const useEndorsement = (id) => useQuery({
    queryKey: ['endorsement', id],
    queryFn: () => fromSupabase(supabase.from('endorsements').select('*').eq('id', id).single()),
});

export const useAddEndorsement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEndorsement) => fromSupabase(supabase.from('endorsements').insert([newEndorsement])),
        onSuccess: () => {
            queryClient.invalidateQueries('endorsements');
        },
    });
};

export const useUpdateEndorsement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEndorsement) => fromSupabase(supabase.from('endorsements').update(updatedEndorsement).eq('id', updatedEndorsement.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('endorsements');
        },
    });
};

export const useDeleteEndorsement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('endorsements').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('endorsements');
        },
    });
};

// Hooks for documents
export const useDocuments = () => useQuery({
    queryKey: ['documents'],
    queryFn: () => fromSupabase(supabase.from('documents').select('*')),
});

export const useDocument = (id) => useQuery({
    queryKey: ['document', id],
    queryFn: () => fromSupabase(supabase.from('documents').select('*').eq('id', id).single()),
});

export const useAddDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDocument) => fromSupabase(supabase.from('documents').insert([newDocument])),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};

export const useUpdateDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedDocument) => fromSupabase(supabase.from('documents').update(updatedDocument).eq('id', updatedDocument.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};

export const useDeleteDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('documents').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('documents');
        },
    });
};

// Hooks for user_profile
export const useUserProfiles = () => useQuery({
    queryKey: ['user_profile'],
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
            queryClient.invalidateQueries('user_profile');
        },
    });
};

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUserProfile) => fromSupabase(supabase.from('user_profile').update(updatedUserProfile).eq('id', updatedUserProfile.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_profile');
        },
    });
};

export const useDeleteUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('user_profile').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_profile');
        },
    });
};

// Hooks for containers
export const useContainers = () => useQuery({
    queryKey: ['containers'],
    queryFn: () => fromSupabase(supabase.from('containers').select('*')),
});

export const useContainer = (id) => useQuery({
    queryKey: ['container', id],
    queryFn: () => fromSupabase(supabase.from('containers').select('*').eq('id', id).single()),
});

export const useAddContainer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newContainer) => fromSupabase(supabase.from('containers').insert([newContainer])),
        onSuccess: () => {
            queryClient.invalidateQueries('containers');
        },
    });
};

export const useUpdateContainer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedContainer) => fromSupabase(supabase.from('containers').update(updatedContainer).eq('id', updatedContainer.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('containers');
        },
    });
};

export const useDeleteContainer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('containers').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('containers');
        },
    });
};