
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const setSecurityHeaders = (res) => {
  res.setHeader('Cache-Control', 'max-age=31536000, immutable');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  res.removeHeader && res.removeHeader('X-XSS-Protection');
  res.removeHeader && res.removeHeader('X-Frame-Options');
};

const app = express();
app.use(cors());

// Endpoint de saúde para teste rápido do backend
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API rodando!' });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/api/page/:page', (req, res) => {
  const lang = req.query.lang || 'pt';
  const filePathLang = path.join(__dirname, 'data', `${req.params.page}_${lang}.json`);
  const filePathDefault = path.join(__dirname, 'data', `${req.params.page}.json`);
  fs.readFile(filePathLang, 'utf8', (err, data) => {
    setSecurityHeaders(res);
    if (!err) {
      console.log(`[API] Página encontrada: ${filePathLang}`);
      return res.json(JSON.parse(data));
    }
    // fallback para arquivo padrão sem sufixo de idioma
    fs.readFile(filePathDefault, 'utf8', (err2, data2) => {
      setSecurityHeaders(res);
      if (!err2) {
        console.log(`[API] Página fallback: ${filePathDefault}`);
        return res.json(JSON.parse(data2));
      }
      console.error(`[API] Página não encontrada: ${filePathLang} nem ${filePathDefault}`);
      res.status(404).json({ error: 'Página não encontrada.' });
    });
  });
});

app.get('/api/translation/:lang', (req, res) => {
  const filePath = path.join(__dirname, 'data', `translation_${req.params.lang}.json`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    setSecurityHeaders(res);
    if (err) {
      console.error(`[API] Tradução não encontrada: ${filePath}`);
      return res.status(404).json({ error: 'Tradução não encontrada.' });
    }
    console.log(`[API] Tradução encontrada: ${filePath}`);
    res.json(JSON.parse(data));
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
