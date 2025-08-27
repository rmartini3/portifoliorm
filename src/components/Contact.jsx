import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../lib/validationSchemas';

function Contact({ t }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
        alert(t.sucesso || 'Mensagem enviada com sucesso!');
      } else {
        alert(t.erro || 'Erro ao enviar mensagem.');
      }
    } catch (error) {
      alert(t.erro || 'Erro ao enviar mensagem.');
    }
  };

  return (
    <section className="contact fade-in">
      <h2 className="text-2xl font-bold mb-4">{t.titulo || 'Contato'}</h2>
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="name">{t.nome || 'Nome'}</label>
          <input id="name" type="text" {...register('name')} aria-invalid={!!errors.name} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">{t.email || 'E-mail'}</label>
          <input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="message">{t.mensagem || 'Mensagem'}</label>
          <textarea id="message" rows={5} {...register('message')} aria-invalid={!!errors.message} />
          {errors.message && <span className="error">{errors.message.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn">
          {isSubmitting ? (t.enviando || 'Enviando...') : (t.enviar || 'Enviar')}
        </button>
        {isSubmitSuccessful && <div className="success">{t.sucesso || 'Mensagem enviada com sucesso!'}</div>}
      </form>
      <ul className="grid grid-cols-1 gap-2 mt-6">
        {(t.contatos || ['Email: rafael@email.com', 'LinkedIn: linkedin.com/in/rafaelmartini', 'GitHub: github.com/rmartini3']).map((cont, idx) => (
          <li key={idx} className="contact-item">{cont}</li>
        ))}
      </ul>
    </section>
  );
}

export default Contact;