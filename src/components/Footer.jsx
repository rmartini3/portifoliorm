import React from 'react';

function Footer({ t }) {
  return (
    <footer className="footer py-4 px-6 bg-footer text-center text-xs text-muted">
      <span>{t.footer || '© 2024 Rafael Martini. Todos os direitos reservados.'}</span>
    </footer>
  );
}

export default Footer;
