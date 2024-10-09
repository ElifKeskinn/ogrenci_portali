'use server'

import { redirect } from 'next/navigation'
import { supabase } from '../utils/supabase/client'

export async function handleEditUser(formData, userId) {
  const name = formData.get('name')
  const surname = formData.get('surname')
  const email = formData.get('email')
  const role = formData.get('role')

  const { error } = await supabase
    .from('users')
    .update({ name, surname, email, role })
    .eq('id', userId)

  if (error) {
    throw new Error(error.message)
  }

  redirect('/admin')
}
