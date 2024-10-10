'use server'

import { redirect } from 'next/navigation'
import { supabase } from '../utils/supabase/client'

export async function handleEditUser(formData, userId) {
  const name = formData.get('name')
  const surname = formData.get('surname')
  const email = formData.get('email')
  const not1 = formData.get('not1')
  const not2 = formData.get('not2')
  const not3 = formData.get('not3')

  const { error } = await supabase
    .from('users')
    .update({ name, surname, email,  not1, not2, not3 })
    .eq('id', userId)

  if (error) {
    throw new Error(error.message)
  }

  redirect('/admin')
}
