import React, { useEffect, useState } from 'react';

function Skills({ t }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErrorState(null);
    fetch(`http://localhost:3001/api/page/habilidades?lang=${t.language}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar dados.');
        return res.json();
      })
      .then(setData)
      .catch(err => setErrorState(err.message))
      .finally(() => setLoading(false));
  }, [t.language]);

  if (loading) {
    return <div className="flex justify-center items-center py-8"><span className="loader" aria-label="Carregando..." /></div>;
  }
  if (errorState) {
    return <div className="text-red-600 text-center py-8" role="alert">{errorState}</div>;
  }

  return (
    <section className="skills fade-in">
      <h2 className="text-2xl font-bold mb-4">{t.titulo || 'Habilidades'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h3 className="font-semibold mb-2">{t.habilidadesTecnicasTitulo || 'Habilidades Técnicas'}</h3>
          <ul className="list-disc pl-5">
            {(t.habilidadesTecnicas || data.technicalSkills || []).map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">{t.habilidadesComportamentaisTitulo || 'Habilidades Comportamentais'}</h3>
          <ul className="list-disc pl-5">
            {(t.habilidadesComportamentais || data.behavioralSkills || []).map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-semibold mb-2">{t.gestaoMetodologiasTitulo || 'Gestão e Metodologias'}</h3>
        <ul className="list-disc pl-5">
          {(t.gestaoMetodologias || data.managementAndMethodologies || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;