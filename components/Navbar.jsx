'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase/client'

export default function Navbar() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }

        getUser()

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            subscription.subscription.unsubscribe()
        }
    }, [])

    return (
        <nav>
            <ul className="navbar">
                <li><Link href="/">Ana Sayfa</Link></li>
                {!user && <li><Link href="/login">Giriş Yap</Link></li>}
                {!user && <li><Link href="/register">Kayıt Ol</Link></li>}
                {user && user.role === 'admin' && <li><Link href="/admin">Admin Paneli</Link></li>}
                {user && <li><Link href="/logout">Çıkış Yap</Link></li>}
            </ul>
        </nav>
    )
}
