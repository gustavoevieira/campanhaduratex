require('dotenv').config();
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do Multer para lidar com arquivos
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5MB por arquivo
  }
});

// Configuração do Nodemailer (substitua com suas credenciais)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Rota para receber os dados do formulário
app.post('/submit-form', upload.array('Fotos_do_Projeto[]', 3), async (req, res) => {
  try {
    const { Nome, Email, Telefone, CPF_ou_CNPJ, Descricao_do_Projeto } = req.body;
    const fotos = req.files;

    let emailBody = `
      <h1>Novo Projeto Enviado</h1>
      <p><strong>Nome:</strong> ${Nome}</p>
      <p><strong>E-mail:</strong> ${Email}</p>
      <p><strong>Telefone:</strong> ${Telefone}</p>
      <p><strong>CPF/CNPJ:</strong> ${CPF_ou_CNPJ}</p>
      <p><strong>Descrição do Projeto:</strong></p>
      <p>${Descricao_do_Projeto}</p>
      <br>
      <p>As fotos foram enviadas em anexo.</p>
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: 'Novo Projeto para a Promoção Salone del Mobile 2026',
      html: emailBody,
      attachments: fotos.map(file => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype
      }))
    };

    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
    res.redirect('/pages/agradecimento.html');

  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);
    res.status(500).send('Erro ao processar o formulário. Por favor, tente novamente mais tarde.');
  }
});

module.exports = app;

app.post('/submit-contact', async (req, res) => {
  try {
    const { Nome, Email, Assunto, Mensagem } = req.body;
    let emailBody = `
      <h1>Nova Mensagem de Contato</h1>
      <p><strong>Nome:</strong> ${Nome}</p>
      <p><strong>E-mail:</strong> ${Email}</p>
      <p><strong>Assunto:</strong> ${Assunto}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${Mensagem}</p>
    `;
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Contato: ${Assunto}`,
      html: emailBody
    };
    await transporter.sendMail(mailOptions);
    console.log('E-mail de contato enviado com sucesso!');
    res.redirect('/pages/agradecimento.html');
  } catch (error) {
    console.error('Erro ao enviar o formulário de contato:', error);
    res.status(500).send('Erro ao processar o formulário. Por favor, tente novamente mais tarde.');
  }
});