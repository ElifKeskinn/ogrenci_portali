'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/client';
import styles from './page.module.css';

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Öğrenci Portalı</div>
        <ul className={styles.navLinks}>
          <li><Link href="/">Ana Sayfa</Link></li>
          <li><Link href="#">Dersler</Link></li>
          <li><Link href="#">Notlar</Link></li>
          <li><Link href="#">İletişim</Link></li>
          {!user && <li><Link href="/login">Giriş Yap</Link></li>}
          {!user && <li><Link href="/register">Kayıt Ol</Link></li>}
          {user && user.role === 'admin' && <li><Link href="/admin">Admin Paneli</Link></li>}
          {user && <li><Link href="/logout">Çıkış Yap</Link></li>}
        </ul>
      </nav>

      <header className={styles.header}>
        <h1>Öğrenci Portalına Hoş Geldiniz</h1>
        <p>Tüm öğrenci kaynaklarına kolayca erişin.</p>
        <button className={styles.ctaButton}>Hemen Başla</button>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.features}>
          <div className={styles.feature}>
            <h2>Dersler</h2>
            <p>Tüm ders materyallerinize tek bir yerden ulaşın.</p>
          </div>
          <div className={styles.feature}>
            <h2>Notlar</h2>
            <p>Akademik ilerlemenizi kolayca takip edin.</p>
          </div>
          <div className={styles.feature}>
            <h2>Topluluk</h2>
            <p>Diğer öğrenciler ve öğretim üyeleriyle bağlantı kurun.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2023 Öğrenci Portalı. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}
