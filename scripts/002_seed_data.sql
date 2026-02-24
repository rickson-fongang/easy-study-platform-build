-- Seed initial courses
INSERT INTO public.courses (title, description, subject, difficulty, total_lessons, thumbnail_url) VALUES
  ('Introduction to Mathematics', 'Learn fundamental math concepts including algebra, geometry, and calculus basics.', 'Mathematics', 'beginner', 24, '/placeholder.svg'),
  ('English Literature', 'Explore classic and modern literature with deep analysis and critical thinking.', 'English', 'intermediate', 18, '/placeholder.svg'),
  ('Physics Fundamentals', 'Understand the laws of physics from mechanics to thermodynamics.', 'Physics', 'beginner', 20, '/placeholder.svg'),
  ('Computer Science 101', 'Introduction to programming, algorithms, and data structures.', 'Computer Science', 'beginner', 30, '/placeholder.svg'),
  ('Chemistry Basics', 'Explore atomic structure, chemical reactions, and organic chemistry.', 'Chemistry', 'intermediate', 22, '/placeholder.svg'),
  ('Biology Essentials', 'Study of living organisms, cells, genetics, and ecosystems.', 'Biology', 'beginner', 16, '/placeholder.svg');

-- Seed initial videos
INSERT INTO public.videos (title, description, subject, video_url, duration_minutes, thumbnail_url) VALUES
  ('Algebra Basics - Variables and Equations', 'Learn the fundamentals of algebra including variables, constants, and solving equations.', 'Mathematics', 'https://example.com/videos/algebra-basics', 45, '/placeholder.svg'),
  ('Shakespeare - Romeo and Juliet Analysis', 'Deep dive into Shakespeare''s most famous tragedy.', 'English', 'https://example.com/videos/romeo-juliet', 60, '/placeholder.svg'),
  ('Newton''s Laws of Motion', 'Understanding the three laws of motion with real-world examples.', 'Physics', 'https://example.com/videos/newtons-laws', 50, '/placeholder.svg'),
  ('Introduction to Python Programming', 'Get started with Python - variables, loops, and functions.', 'Computer Science', 'https://example.com/videos/python-intro', 55, '/placeholder.svg'),
  ('The Periodic Table Explained', 'Understanding elements, groups, and periods in chemistry.', 'Chemistry', 'https://example.com/videos/periodic-table', 40, '/placeholder.svg'),
  ('Cell Biology - Structure and Function', 'Explore the building blocks of life.', 'Biology', 'https://example.com/videos/cell-biology', 35, '/placeholder.svg');
