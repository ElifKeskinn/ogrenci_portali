'use client';
import { useState } from 'react';

export default function AddStudentModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    not1: 0,
    not2: 0,
    not3: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="AddStudentModal-overlay">
      <div className="AddStudentModal">
        <h2>Yeni Öğrenci Ekle</h2>
        <form onSubmit={handleSubmit}>
          <label>Ad</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Soyad</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Şifre</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>Not 1</label>
          <input type="number" name="not1" value={formData.not1} onChange={handleChange} />

          <label>Not 2</label>
          <input type="number" name="not2" value={formData.not2} onChange={handleChange} />

          <label>Not 3</label>
          <input type="number" name="not3" value={formData.not3} onChange={handleChange} />

          <button type="submit">Ekle</button>
          <button type="button" onClick={onClose}>Kapat</button>
        </form>
      </div>
    </div>
  );
}
