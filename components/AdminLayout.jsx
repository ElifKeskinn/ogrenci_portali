import Link from 'next/link'

export default function AdminLayout({ children }) {
    return (
        <div className="adminLayout">
          <nav className="adminNavbar">
            <ul className="adminNavLinks">
              <li><Link className="adminNavLink" href="/admin">Admin Paneli</Link></li>
              <li><Link className="adminNavLink" href="/">Ana Sayfa</Link></li>
              <li><Link className="logoutButton" href= "/">Çıkış Yap</Link></li>
            </ul>
          </nav>
          <main>{children}</main>
        </div>
      )
}
