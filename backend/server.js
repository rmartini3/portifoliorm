// ...existing code...
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// ...existing code...

// ...existing code...

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');

function getJsonFile(file) {
  return path.join(DATA_DIR, file + '.json');
}

app.get('/api/page/:page', (req, res) => {
  const lang = req.query.lang || 'pt';
  const filePath = getJsonFile(req.params.page);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'Arquivo não encontrado.' });
    try {
      const json = JSON.parse(data);
      res.json(json[lang] || json['pt']);
    } catch {
      res.status(500).json({ error: 'Erro ao ler JSON.' });
    }
  });
});

app.get('/api/translation/:lang', (req, res) => {
  const filePath = getJsonFile('translations');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'Arquivo não encontrado.' });
    try {
      const json = JSON.parse(data);
      res.json(json[req.params.lang] || json['pt']);
    } catch {
      res.status(500).json({ error: 'Erro ao ler JSON.' });
    }
  });
});

app.post('/api/contact', (req, res) => {
  // Exemplo: integração com nodemailer
  // const { name, email, message } = req.body;
  // ...
  res.json({ success: true, message: 'Contato recebido!' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
