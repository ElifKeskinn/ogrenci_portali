'use client';
import { useState } from 'react';
import { handleLogin } from '../../actions/loginAction';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  return (
    <div className="container">
      <h1>Giriş Yap</h1>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [error, setError] = useState(null); 
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    console.log("Email:", formData.get('email'));
    console.log("Password:", formData.get('password'));

    try {
      const result = await handleLogin(formData);
      if (result.success) {
        setError(null); 
        router.push('/admin'); 
        setError(result.message);  
      }
    } catch (err) {
      setError(err.message); 
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" name="email" required />

      <label>Şifre:</label>
      <input type="password" name="password" required />

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      <button type="submit">Giriş Yap</button>
    </form>
  );
}
