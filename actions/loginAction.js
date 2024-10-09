'use server'

import { redirect } from 'next/navigation'
import { supabase } from '../utils/supabase/client'

export async function handleLogin(formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/')
}
