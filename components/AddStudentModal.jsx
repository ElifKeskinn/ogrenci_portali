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
    window.location.reload(); 
  };

  if (!isOpen) return null;

  return (
    <div className="addStudentModalOverlay">
      <div className="addStudentModalContent">
        <h2 className="addStudentModalTitle">Yeni Öğrenci Ekle</h2>
        <form className="addStudentForm" onSubmit={handleSubmit}>
          <label className="addStudentLabel">Ad</label>
          <input className="addStudentInput" type="text" name="name" value={formData.name} onChange={handleChange} required />
  
          <label className="addStudentLabel">Soyad</label>
          <input className="addStudentInput" type="text" name="surname" value={formData.surname} onChange={handleChange} required />
  
          <label className="addStudentLabel">Email</label>
          <input className="addStudentInput" type="email" name="email" value={formData.email} onChange={handleChange} required />
  
          <label className="addStudentLabel">Şifre</label>
          <input className="addStudentInput" type="password" name="password" value={formData.password} onChange={handleChange} required />
  
          <label className="addStudentLabel">Not 1</label>
          <input className="addStudentInput" type="number" name="not1" value={formData.not1} onChange={handleChange} />
  
          <label className="addStudentLabel">Not 2</label>
          <input className="addStudentInput" type="number" name="not2" value={formData.not2} onChange={handleChange} />
  
          <label className="addStudentLabel">Not 3</label>
          <input className="addStudentInput" type="number" name="not3" value={formData.not3} onChange={handleChange} />
  
          <button className="addStudentSubmitButton" type="submit">Ekle</button>
          <button className="addStudentCloseButton" type="button" onClick={onClose}>Kapat</button>
        </form>
      </div>
    </div>
  );
}
