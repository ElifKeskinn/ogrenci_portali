'use client';
import { useState } from 'react';
import { handleLogin } from '../../actions/loginAction';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  return (
    <div className="container">
      <h1 className="loginTitle">Giriş Yap</h1>
      <LoginForm />
    </div>
  );}

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
    <form className="loginForm" onSubmit={handleSubmit}>
      <label className="loginLabel">Email:</label>
      <input className="loginInput" type="email" name="email" required />
  
      <label className="loginLabel">Şifre:</label>
      <input className="loginInput" type="password" name="password" required />
  
      {error && <p className="errorMessage">{error}</p>} 
  
      <button className="loginButton" type="submit">Giriş Yap</button>
    </form>
  );
}
