'use client'
import { handleEditUser } from '../../../../actions/editUserAction'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../../../../utils/supabase/client'
import AdminLayout from '../../../../components/AdminLayout'

export default function EditUserPage({ params }) {
  const userId = params.id
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()
      if (error) {
        console.error(error)
      } else {
        setUser(data)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  if (!user) {
    return <div>Yükleniyor...</div>
  }

  return (
    <AdminLayout>
      <h1>Kullanıcıyı Düzenle</h1>
      <EditUserForm user={user} />
    </AdminLayout>
  )
}

function EditUserForm({ user }) {
  return (
    <form action={(formData) => handleEditUser(formData, user.id)}>
      <label>Ad:</label>
      <input type="text" name="name" defaultValue={user.name} required />

      <label>Soyad:</label>
      <input type="text" name="surname" defaultValue={user.surname} required />

      <label>Email:</label>
      <input type="email" name="email" defaultValue={user.email} required />

      <label>Rol:</label>
      <select name="role" defaultValue={user.role}>
        <option value="student">Öğrenci</option>
        <option value="admin">Admin</option>
      </select>
      
      <label>Not 1:</label>
      <input type="text" name="name" defaultValue={user.not1} required />

      <label>Not 2:</label>
      <input type="text" name="name" defaultValue={user.not2} required />
     
      <label>Not 3:</label>
      <input type="text" name="name" defaultValue={user.not3} required />


      <button type="submit">Güncelle</button>
    </form>
  )
}
