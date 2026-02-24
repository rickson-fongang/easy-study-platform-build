import { createClient } from '@supabase/supabase-js'

// --- SUPABASE CONFIG ---
const supabaseUrl = 'https://vcyjhcjufoqpfungxmtw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjeWpoY2p1Zm9xcGZ1bmd4bXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDEzMzgsImV4cCI6MjA4NzUxNzMzOH0.7nJLQfQwK5pQ1j2eJvRWkW8W573VnpL8d1FBjdcYv_g'
export const supabase = createClient(supabaseUrl, supabaseKey)

// --- INTERFACES (Keeping your existing types) ---
export interface ApiResponse<T> {
  success: boolean; data?: T; error?: string; message?: string;
}

export interface User { id: string; name: string; email: string; role: "student" | "tutor" | "admin"; avatar?: string; createdAt: string; lastActive: string; }
export interface Course { id: string; title: string; description: string; progress: number; totalVideos: number; watchedVideos: number; nextDeadline: string; status: "active" | "pending" | "completed"; tutorId: string; enrolledAt: string; }
export interface Task { id: string; title: string; description: string; subject: string; dueDate: string; status: "pending" | "in-progress" | "completed" | "overdue"; courseId: string; studentId: string; tutorId: string; submittedAt?: string; grade?: number; }

// --- AUTH API FUNCTIONS ---
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true, data: { user: data.user, token: data.session?.access_token || "" } };
  },
  register: async (userData: { name: string; email: string; password: string; role: string }): Promise<ApiResponse<any>> => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: { data: { full_name: userData.name, role: userData.role } }
    });
    if (error) return { success: false, error: error.message };
    
    // Create profile in your custom 'users' table
    await supabase.from('users').insert([{ 
        id: data.user?.id, 
        first_name: userData.name.split(' ')[0], 
        last_name: userData.name.split(' ')[1] || '',
        email: userData.email,
        user_type: userData.role 
    }]);
    
    return { success: true, data };
  },
  logout: async () => {
    await supabase.auth.signOut();
    return { success: true };
  }
}

// --- STUDENT API FUNCTIONS ---
export const studentApi = {
  getProfile: async () => {
     const { data: { user } } = await supabase.auth.getUser();
     const { data } = await supabase.from('users').select('*').eq('id', user?.id).single();
     return { success: true, data };
  },
  getTasks: async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    return { success: !error, data: data as any };
  },
  // Map other functions similarly...
}

// --- TUTOR API FUNCTIONS ---
export const tutorApi = {
  getVideos: async () => {
    const { data, error } = await supabase.from('videos').select('*');
    return { success: !error, data: data as any };
  },
  createTask: async (taskData: Partial<Task>) => {
    const { data, error } = await supabase.from('tasks').insert([taskData]).select();
    return { success: !error, data: data?.[0] as any };
  }
}
