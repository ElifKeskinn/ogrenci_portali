'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase/client'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../components/AdminLayout'

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*')
      if (error) {
        console.error(error)
      } else {
        setUsers(data)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (confirm('Kullanıcıyı silmek istediğinize emin misiniz?')) {
      const { error } = await supabase.from('users').delete().eq('id', id)
      if (error) {
        alert(error.message)
      } else {
        setUsers(users.filter(user => user.id !== id))
      }
    }
  }

  return (
    <>
    <AdminLayout/>
      <h1>Admin Paneli</h1>
      <button onClick={() => router.push('/admin/add-user')}>Yeni Kullanıcı Ekle</button>
      <table>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Email</th>
            <th>Rol</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => router.push(`/admin/users/${user.id}`)}>Düzenle</button>
                <button onClick={() => handleDelete(user.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  )
}