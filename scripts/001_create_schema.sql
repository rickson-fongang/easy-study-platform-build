-- EasyStudy Platform Database Schema

-- Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'tutor', 'admin')),
  avatar TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'rejected', 'suspended')),
  tutor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS: users can read their own profile, tutors can read their students
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (
  auth.uid() = id
  OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'tutor'
  OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (
  auth.uid() = id
  OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'tutor'
);

-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  tutor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_videos INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_select" ON public.courses FOR SELECT USING (true);
CREATE POLICY "courses_insert_tutor" ON public.courses FOR INSERT WITH CHECK (
  auth.uid() = tutor_id
);
CREATE POLICY "courses_update_tutor" ON public.courses FOR UPDATE USING (
  auth.uid() = tutor_id
);
CREATE POLICY "courses_delete_tutor" ON public.courses FOR DELETE USING (
  auth.uid() = tutor_id
);

-- Enrollments table (links students to courses)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  watched_videos INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  next_deadline TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrollments_select" ON public.enrollments FOR SELECT USING (
  auth.uid() = student_id
  OR EXISTS (SELECT 1 FROM public.courses WHERE courses.id = enrollments.course_id AND courses.tutor_id = auth.uid())
);
CREATE POLICY "enrollments_insert" ON public.enrollments FOR INSERT WITH CHECK (
  auth.uid() = student_id
  OR EXISTS (SELECT 1 FROM public.courses WHERE courses.id = enrollments.course_id AND courses.tutor_id = auth.uid())
);
CREATE POLICY "enrollments_update" ON public.enrollments FOR UPDATE USING (
  auth.uid() = student_id
  OR EXISTS (SELECT 1 FROM public.courses WHERE courses.id = enrollments.course_id AND courses.tutor_id = auth.uid())
);

-- Videos table
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  thumbnail TEXT,
  duration INTEGER DEFAULT 0,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "videos_select" ON public.videos FOR SELECT USING (true);
CREATE POLICY "videos_insert_tutor" ON public.videos FOR INSERT WITH CHECK (auth.uid() = tutor_id);
CREATE POLICY "videos_update_tutor" ON public.videos FOR UPDATE USING (auth.uid() = tutor_id);
CREATE POLICY "videos_delete_tutor" ON public.videos FOR DELETE USING (auth.uid() = tutor_id);

-- Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT,
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'overdue')),
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ,
  grade INTEGER CHECK (grade >= 0 AND grade <= 100),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tasks_select" ON public.tasks FOR SELECT USING (
  auth.uid() = student_id OR auth.uid() = tutor_id
);
CREATE POLICY "tasks_insert_tutor" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = tutor_id);
CREATE POLICY "tasks_update" ON public.tasks FOR UPDATE USING (
  auth.uid() = student_id OR auth.uid() = tutor_id
);

-- Activities table
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('video', 'task', 'message', 'login', 'enrollment')),
  title TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "activities_select_own" ON public.activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "activities_insert_own" ON public.activities FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Messages table (for chatroom)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select" ON public.messages FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "messages_insert" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "messages_update_read" ON public.messages FOR UPDATE USING (auth.uid() = receiver_id);

-- Study time settings table
CREATE TABLE IF NOT EXISTS public.study_time_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_limit_seconds INTEGER DEFAULT 86400,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.study_time_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "study_time_select" ON public.study_time_settings FOR SELECT USING (
  auth.uid() = student_id OR auth.uid() = tutor_id
);
CREATE POLICY "study_time_insert_tutor" ON public.study_time_settings FOR INSERT WITH CHECK (auth.uid() = tutor_id);
CREATE POLICY "study_time_update_tutor" ON public.study_time_settings FOR UPDATE USING (auth.uid() = tutor_id);

-- Auto-create profile trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'student'),
    CASE
      WHEN COALESCE(NEW.raw_user_meta_data ->> 'role', 'student') = 'tutor' THEN 'active'
      ELSE 'pending'
    END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update last_active function
CREATE OR REPLACE FUNCTION public.update_last_active()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles SET last_active = NOW() WHERE id = NEW.id;
  RETURN NEW;
END;
$$;
