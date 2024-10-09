'use client';
import { useState } from 'react';
import { handleLogin } from '../../actions/loginAction';

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

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    console.log("Email:", formData.get('email'));
    console.log("Password:", formData.get('password'));

    try {
      await handleLogin(formData);
      setError(null); 
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
