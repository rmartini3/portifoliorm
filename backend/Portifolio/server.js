// server.js - Servidor Node.js para validação de código.

// Importa os módulos necessários
import express from 'express';
import cors from 'cors'; // O middleware CORS foi importado corretamente
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// Módulos de validação importados do front-end
// IMPORTANTE: Assumimos que você moveu os arquivos de validação para 'backend/validators/'
import { LanguageDetector } from './validators/LanguageDetector.js';
import { SyntaxValidator } from './validators/SyntaxValidator.js';
import { IndentationValidator } from './validators/IndentationValidator.js';
import { PooUmlValidator } from './validators/PooUmlValidator.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

// --- Middleware ---
// Adiciona o middleware CORS para permitir requisições do frontend
app.use(cors()); 
app.use(express.json());

// --- Instância dos Validadores ---
const detector = new LanguageDetector();
const syntaxValidator = new SyntaxValidator(detector);
const indentationValidator = new IndentationValidator();
const pooUmlValidator = new PooUmlValidator();

// --- Novo Endpoint de Validação de Código ---
app.post('/api/validate', async (req, res) => {
  const { code, language, options } = req.body;
  const results = [];

  // Verificação básica: se o código está vazio, retorna um erro
  if (!code || code.trim() === '') {
    return res.status(400).json({ error: 'Nenhum código para validar foi fornecido.' });
  }

  // Validação de sintaxe
  const syntaxMessages = await syntaxValidator.validate(code, language, null);
  results.push({ type: 'syntax', messages: syntaxMessages });

  // Validação de indentação, se a opção estiver marcada
  if (options.checkIndentation) {
    const indentationResult = indentationValidator.validate(code);
    results.push({ type: 'indentation', result: indentationResult });
  }

  // Validação de POO/UML, se a opção estiver marcada
  if (options.checkOOP) {
    const oopResult = pooUmlValidator.validate(code, language);
    results.push({ type: 'oop', result: oopResult });
  }

  // Retorna os resultados em formato JSON
  res.json({ success: true, validationResults: results });
});

// --- Endpoints do seu Portfólio (mantidos) ---
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
  res.json({ success: true, message: 'Contato recebido!' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
