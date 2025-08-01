-- Create a function to get all auth users with their profile data
CREATE OR REPLACE FUNCTION public.get_all_users_with_profiles()
RETURNS TABLE (
  auth_user_id uuid,
  email text,
  created_at_auth timestamp with time zone,
  profile_id uuid,
  display_name text,
  avatar_url text,
  role text,
  created_at_profile timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    au.id as auth_user_id,
    au.email,
    au.created_at as created_at_auth,
    p.id as profile_id,
    p.display_name,
    p.avatar_url,
    COALESCE(p.role, 'user') as role,
    p.created_at as created_at_profile,
    p.updated_at
  FROM auth.users au
  LEFT JOIN public.profiles p ON au.id = p.user_id
  ORDER BY au.created_at DESC;
$$;