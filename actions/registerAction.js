'use server'

import { redirect } from 'next/navigation'
import { supabase } from '../utils/supabase/client'

export async function handleRegister(formData) {
  const name = formData.get('name')
  const surname = formData.get('surname')
  const email = formData.get('email')
  const password = formData.get('password')

  const { data: user, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  }, {
    data: { role: 'student', name, surname }
  })

  if (signUpError) {
    throw new Error(signUpError.message)
  }

  const { error: insertError } = await supabase
    .from('users')
    .insert([
      { id: user.id, name, surname, email, role: 'student' }
    ])

  if (insertError) {
    throw new Error(insertError.message)
  }

  redirect('/login')
}
