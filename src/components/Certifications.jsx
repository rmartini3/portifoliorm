import React from 'react';

function Certifications({ t }) {
  return (
    <section className="certifications fade-in">
      <h2 className="text-2xl font-bold mb-4">{t.titulo || 'Certificações'}</h2>
      <ul className="grid grid-cols-1 gap-2">
        {(t.certificacoes || ['Certificado 1', 'Certificado 2', 'Certificado 3']).map((cert, idx) => (
          <li key={idx} className="cert-item">{cert}</li>
        ))}
      </ul>
    </section>
  );
};

export default Certifications;