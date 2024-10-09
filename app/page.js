'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [scores, setScores] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error(error)
      } else {
        if (user) {
          setUser(user)
          fetchScores(user.id)
        } else {
          router.push('/login')
        }
      }
    }

    fetchUser()
  }, [router])

  const fetchScores = async (userId) => {
    const { data, error } = await supabase
      .from('exam_scores')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      console.error(error)
    } else {
      setScores(data)
    }
  }

  const calculateAverage = () => {
    if (!scores.length) return 'Not Bulunmamaktadır.'
    const total = scores.reduce((acc, score) => acc + score.score, 0)
    const average = total / scores.length
    if (average >= 90) return 'AA'
    if (average >= 80) return 'AB'
    if (average >= 70) return 'BB'
    if (average >= 60) return 'CC'
    return 'FF'
  }

  if (!user) {
    return <div>Yükleniyor...</div>
    {/*bu kısım editlenecek direkt
       login ekranına bağlamayı düşünüyorum
       ama şimdilik böyle kalsın
       return kısmını da user giriş yaptıysa olarak yazdım */}
  }

  return (
    <div className="container">
      <h1>Ana Sayfa</h1>
      <h2>Hoşgeldiniz, {user.email}</h2>
      {scores.length > 0 ? (
        <div>
          <h3>Sınav Notlarınız</h3>
          <table>
            <thead>
              <tr>
                <th>Sınav Türü</th>
                <th>Puan</th>
              </tr>
            </thead>
            <tbody>
              {scores.map(score => (
                <tr key={score.id}>
                  <td>{score.exam_type}</td>
                  <td>{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Ortalama: {calculateAverage()}</p>
        </div>
      ) : (
        <p>Notlarınız bulunmamaktadır.</p>
      )}
    </div>
  )
}
