'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase/client'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../components/AdminLayout'
import Modal from '../../components/Modal'
import AddStudentModal from '@/components/AddStudentModal'

export default function AdminPanel() {
  const [users, setUsers] = useState([])
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const [userToDelete, setUserToDelete] = useState(null)
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('role', 'student') 
      if (error) {
        console.error(error)
      } else {
        const usersWithGrades = data.map(user => ({
          ...user,
          averageGrade: calculateLetterGrade((user.not1 + user.not2 + user.not3) / 3)
        }))
        setUsers(usersWithGrades)
      }
    }

    fetchUsers()
  }, [])

  const calculateLetterGrade = (average) => {
    if (average >= 90) return 'AA'
    if (average >= 80) return 'AB'
    if (average >= 70) return 'BB'
    if (average >= 60) return 'BC'
    if (average >= 50) return 'CC'
    if (average >= 40) return 'DC'
    if (average >= 30) return 'DD'
    return 'FF'
  }

  const handleDelete = async () => {
    if (userToDelete) {
      const { error } = await supabase.from('users').delete().eq('id', userToDelete)
      if (error) {
        alert(error.message)
      } else {
        setUsers(users.filter(user => user.id !== userToDelete))
      }
      setIsModalOpen(false)
      setUserToDelete(null) 
    }
  }


  const openDeleteModal = (id) => {
    setUserToDelete(id)
    setIsModalOpen(true) 
  }


  const handleAddUser = async (newUserData) => {
    const { data, error } = await supabase.from('users').insert([{
      ...newUserData,
      role: 'student', 
      created_at: new Date(),
    }]);

    if (error) {
      console.error('Error adding user:', error.message);
      return; 
    }

    if (data && data.length > 0) {
      const newUser = data[0];
      setUsers([...users, {
        ...newUser,
        averageGrade: calculateLetterGrade((newUserData.not1 + newUserData.not2 + newUserData.not3) / 3),
      }]);
    } else {
      console.error('No data returned from the insert operation.');
    }

    setIsAddStudentModalOpen(false);
  };


  return (
    <>
    <AdminLayout/>
      <h1>Admin Paneli</h1>
      <button onClick={() => setIsAddStudentModalOpen(true)}>Yeni Öğrenci Ekle</button>
      <table>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Email</th>
            <th>Harf Notu</th> 
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.averageGrade}</td> 
              <td>
                <button onClick={() => router.push(`/admin/users/${user.id}`)}>Düzenle</button>
                <button onClick={() => openDeleteModal(user.id)}>Sil</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleDelete} 
      />

      <AddStudentModal
        isOpen={isAddStudentModalOpen}
       onClose={() => setIsAddStudentModalOpen(false)}
       onSubmit={handleAddUser} 
     />
      </>
  )
}
