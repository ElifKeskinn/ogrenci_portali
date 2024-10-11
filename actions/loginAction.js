'use server';

import { supabase } from '../utils/supabase/client';
import { redirect } from 'next/navigation';

export async function handleLogin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase login error:', error.message);
      throw new Error('Invalid login credentials');
    }

    console.log('Login successful:', data);
    redirect('/'); 
    
  } catch (err) {
    console.error('Login sırasında hata:', err);
    throw new Error('Sunucu tarafında bir hata oluştu.');
  }
}
