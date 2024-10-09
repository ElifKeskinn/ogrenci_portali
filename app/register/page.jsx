import { handleRegister } from '../../actions/registerAction'

export default function RegisterPage() {
  return (
    <div className="container">
      <h1>Kayıt Oluştur</h1>
      <RegisterForm />
    </div>
  )
}

  function RegisterForm() {
    return (
      <form action={handleRegister} method="post">
        <label>Ad:</label>
        <input type="text" name="name" required />
  
        <label>Soyad:</label>
        <input type="text" name="surname" required />
  
        <label>Email:</label>
        <input type="email" name="email" required />
  
        <label>Şifre:</label>
        <input type="password" name="password" required />
  
        <button type="submit">Kullanıcı Ekle</button>
      </form>
    )
  }