-- Create function to promote first user or specific email to admin
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email text DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
DECLARE
    target_user_id uuid;
    result_message text;
BEGIN
    -- If no email provided, get the first user by creation date
    IF user_email IS NULL THEN
        SELECT au.id INTO target_user_id
        FROM auth.users au
        ORDER BY au.created_at ASC
        LIMIT 1;
        
        IF target_user_id IS NULL THEN
            RETURN 'No users found in the system';
        END IF;
        
        result_message := 'First user promoted to admin';
    ELSE
        -- Get user ID from provided email
        SELECT au.id INTO target_user_id
        FROM auth.users au
        WHERE au.email = user_email;
        
        IF target_user_id IS NULL THEN
            RETURN 'User not found with email: ' || user_email;
        END IF;
        
        result_message := 'User ' || user_email || ' promoted to admin';
    END IF;
    
    -- Update user role to admin
    UPDATE public.profiles 
    SET role = 'admin', updated_at = now()
    WHERE user_id = target_user_id;
    
    -- If no profile exists, create one
    IF NOT FOUND THEN
        INSERT INTO public.profiles (user_id, display_name, role)
        VALUES (target_user_id, 'Admin', 'admin');
        result_message := result_message || ' (profile created)';
    END IF;
    
    RETURN result_message;
END;
$$;

-- Promote the first user to admin automatically
SELECT public.promote_to_admin();