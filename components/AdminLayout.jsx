import Link from 'next/link'

export default function AdminLayout({ children }) {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link href="/admin">Admin Paneli</Link></li>
                    <li><Link href="/admin/add-user">Yeni Kullanıcı Ekle</Link></li>
                    <li><Link href="/">Ana Sayfa</Link></li>
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    )
}
