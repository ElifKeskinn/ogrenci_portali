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
    <form className="editUserForm" onSubmit={(formData) => handleEditUser(formData, user.id)}>
      <label className="formLabel">Ad:</label>
      <input className="formInput" type="text" name="name" defaultValue={user.name} required />
  
      <label className="formLabel">Soyad:</label>
      <input className="formInput" type="text" name="surname" defaultValue={user.surname} required />
  
      <label className="formLabel">Email:</label>
      <input className="formInput" type="email" name="email" defaultValue={user.email} required />
  
      <label className="formLabel">Not 1:</label>
      <input className="formInput" type="text" name="not1" defaultValue={user.not1} required />
  
      <label className="formLabel">Not 2:</label>
      <input className="formInput" type="text" name="not2" defaultValue={user.not2} required />
  
      <label className="formLabel">Not 3:</label>
      <input className="formInput" type="text" name="not3" defaultValue={user.not3} required />
  
      <button className="submitButton" type="submit">Güncelle</button>
    </form>
  )}