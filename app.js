const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the landing page
app.get('/', (req, res) => {
    res.render('index');
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, phone, 'business-type': businessType, message } = req.body;

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: 'gabriel@wenodai.com',
        subject: `Novo Contato do Site WenodAI - ${name}`,
        html: `
            <h2>Novo Pedido de Contato</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Tipo de Negócio:</strong> ${businessType}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Ocorreu um erro ao enviar o email. Tente novamente mais tarde.');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email enviado com sucesso!');
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
