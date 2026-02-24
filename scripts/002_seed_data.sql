-- Temporarily disable RLS and FK checks to seed data
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos DISABLE ROW LEVEL SECURITY;

-- Drop FK constraints temporarily
ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_tutor_id_fkey;
ALTER TABLE public.videos DROP CONSTRAINT IF EXISTS videos_tutor_id_fkey;
ALTER TABLE public.videos DROP CONSTRAINT IF EXISTS videos_course_id_fkey;

-- Seed courses
INSERT INTO public.courses (id, title, description, tutor_id, total_videos, status) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Mathematics Fundamentals', 'Core math concepts including algebra, geometry, and calculus.', '00000000-0000-0000-0000-000000000000', 3, 'active'),
  ('a0000000-0000-0000-0000-000000000002', 'Physics 101', 'Introduction to mechanics, thermodynamics, and waves.', '00000000-0000-0000-0000-000000000000', 2, 'active'),
  ('a0000000-0000-0000-0000-000000000003', 'English Literature', 'Exploring classic and modern literary works.', '00000000-0000-0000-0000-000000000000', 1, 'active'),
  ('a0000000-0000-0000-0000-000000000004', 'Computer Science Basics', 'Programming fundamentals, data structures, and algorithms.', '00000000-0000-0000-0000-000000000000', 2, 'active')
ON CONFLICT (id) DO NOTHING;

-- Seed videos
INSERT INTO public.videos (title, description, duration, course_id, tutor_id, sort_order) VALUES
  ('Intro to Algebra', 'Learn the basics of algebraic expressions.', 1800, 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 1),
  ('Linear Equations', 'Solving single and multi-variable equations.', 2400, 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 2),
  ('Geometry Basics', 'Shapes, angles, and core theorems.', 2100, 'a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 3),
  ('Newtons Laws', 'Understanding the three laws of motion.', 1500, 'a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 1),
  ('Energy and Work', 'Kinetic and potential energy concepts.', 2000, 'a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 2),
  ('Shakespeare Overview', 'A guide to major Shakespearean works.', 1800, 'a0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 1),
  ('Python Basics', 'Getting started with Python programming.', 2700, 'a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 1),
  ('Data Structures', 'Arrays, lists, stacks, and queues.', 3000, 'a0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 2);

-- Re-add FK constraints
ALTER TABLE public.courses ADD CONSTRAINT courses_tutor_id_fkey FOREIGN KEY (tutor_id) REFERENCES auth.users(id) ON DELETE CASCADE NOT VALID;
ALTER TABLE public.videos ADD CONSTRAINT videos_tutor_id_fkey FOREIGN KEY (tutor_id) REFERENCES auth.users(id) ON DELETE CASCADE NOT VALID;
ALTER TABLE public.videos ADD CONSTRAINT videos_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE NOT VALID;

-- Re-enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
