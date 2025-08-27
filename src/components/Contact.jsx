import React from 'react';

function Contact({ t }) {
  return (
    <section className="contact fade-in">
      <h2 className="text-2xl font-bold mb-4">{t.titulo || 'Contato'}</h2>
      <ul className="grid grid-cols-1 gap-2">
        {(t.contatos || ['Email: rafael@email.com', 'LinkedIn: linkedin.com/in/rafaelmartini', 'GitHub: github.com/rmartini3']).map((cont, idx) => (
          <li key={idx} className="contact-item">{cont}</li>
        ))}
      </ul>
    </section>
  );
}

export default Contact;