import React, { useEffect, useState } from 'react';

function Experience({ t }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3001/api/page/experiencia?lang=${t.lang}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar dados.');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [t.lang]);

  if (loading) {
    return <div className="flex justify-center items-center py-8"><span className="loader" aria-label="Carregando..." /></div>;
  }
  if (error) {
    return <div className="text-red-600 text-center py-8" role="alert">{error}</div>;
  }

  return (
    <section className="experience-content section fade-in">
      <h2 tabIndex="0">{t.titulo || 'Experiência'}</h2>
      <div className="mt-6 grid gap-8">
        {(t.experiencias || data.experiences || []).map((exp, idx) => (
          <div key={idx} className="card">
            <h3 className="font-semibold mb-2">{exp.title || exp}</h3>
            <p className="mb-1"><strong>Empresa:</strong> {exp.company} | <strong>Período:</strong> {exp.period} | {exp.location}</p>
            <h4 className="font-semibold mt-2 mb-1">Responsabilidades:</h4>
            <ul className="list-disc pl-5 mb-2">
              {exp.responsibilities && exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
            <h4 className="font-semibold mt-2 mb-1">Ferramentas:</h4>
            <p>{exp.tools}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;