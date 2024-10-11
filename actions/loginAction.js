"use server";

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const defaultUserMetadata = {
  role: 'user',
  firstName: '',
  lastName: '',
  profilePhoto: '',
  bio: '',
  birthDate: '',
};

export async function handleLogin(formData) {
  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  }

);

  if (error) {
    console.error('Error logging in:', error);
    return { success: false, message: error.message };
  } else {
    return { success: true };
  
  }
  
}
