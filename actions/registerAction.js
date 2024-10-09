'use server'

import { redirect } from 'next/navigation'
import { supabase } from '../utils/supabase/client'

export async function handleRegister(formData) {
  const { data: { session } } = await supabase.auth.getSession()

 /* if (!session || session.user.role !== 'admin') {
    throw new Error('Bu işlemi gerçekleştirmek için yetkiniz yok.')
  }*/

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

  redirect('/')
}
