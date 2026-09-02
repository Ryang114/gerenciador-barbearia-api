// Importação que permite o Node ter acesso a ferramentas capazes de entender o pacote express  
const express = require("express");

// Importação que permite o Node ter acesso às ferramentas do MySQL, ou seja, permite falar e entender o MySQL do XAMPP (ou seja, se comunicar com o banco de dados) 
const mysql = require("mysql2");

// e uma importação que permite que o node tenha acesso a ferramenta cors que e uma ferramenta de segurança que faz com que o node e o bakend comunique com o frontend ja que eles estãndo em portas diferentes (o bakend esta na porta 3000 e o frontend eta na porta 5173).
const cors = require("cors");

// É o Express já executado 
const app = express();

// É a porta onde será executado o nosso projeto 
const port = 3000;

//Essa linha e uma função que permite o node e o express (que são o backend) terem acesso ao colors que e uma ferramenta que permite que o bakend se comunicarar com o frontend (que no caso e o rect) que estão em portas diferentes.
app.use(cors());

// Essa linha é uma função onde ela permite que o próprio Express entenda os arquivos em formato JSON 
app.use(express.json());

// Criando a conexão com o banco de dados do XAMPP (no caso, ele está apenas pegando as informações para que, se estiver tudo certo, o servidor consiga se conectar com o banco de dados)(Aqui ele só pega as informações)
const connection = mysql.createConnection({
  // Essa linha mostra as informações para que o servidor consiga se conectar com o banco de dados no MySQL do XAMPP, se as informações estiverem corretas no MySQL. (É só o gabarito das informações do banco, ou seja, o crachá)

  host: "localhost", // Essa linha significa que o banco de dados está rodando localmente nessa própria máquina 
  user: "root",      // Esse é o nome do usuário do banco de dados que o XAMPP cria por padrão (que no caso é o "root")
  password: "",      // Essa é a senha do usuário do banco de dados que o XAMPP cria por padrão (ela é vazia, ou seja, sem senha)
  database: "barbearia_db" // Esse é o nome do banco de dados que foi criado lá no MySQL do XAMPP, que no caso é (barbearia_db)

  // O servidor do XAMPP (no caso, o Apache) e o banco de dados não estão ativos por padrão. Você tem que ir lá no painel de controle e dar "Start" nos dois para que o servidor Apache e o banco de dados MySQL rodem, para que a aplicação seja executada corretamente.
});

connection.connect((erro) => { // Essa linha faz o Node usar as informações que foram passadas acima para ele tentar se conectar com o banco de dados. Mas se essa conexão receber um erro (ou seja, se uma das informações do crachá ou gabarito que estão lá em cima estiverem erradas), a função vai receber o erro.
  if (erro) { // Se a função receber erro, ele vai mostrar a mensagem do console.error no terminal do VS Code 
    console.error("Erro ao conectar ao banco de dados:", erro);
  } else { // Se a função não receber erro, a conexão vai ser estabelecida com sucesso e vai mostrar a mensagem do console.log no terminal do VS Code 
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  }
});

//Rota de cadastro 
app.post("/cadastro", function (req, res) {
  const { nome, email, telefone, senha, confirmarSenha } = req.body

  //Confirma se se todoas os capos forma prechidos se n retorna erro e n deixa o cadastro ser feito 
  if (!nome || !email || !telefone || !senha || !confirmarSenha) {
    console.error("Sever: todos os campos são obirgatorios");
    res.status(400).json({ mensagem: "Todos os caampos são obrigatorios" })
    return;
  }

  if (senha !== confirmarSenha) {
    console.log("As senhas não são iguais");
    res.status(400).json({ mensagem: "As senhas não são iquais" });
    return;
  }
  const sqlVerificarEmail = "SELECT * FROM usuarios WHERE email = ?";

  connection.query(sqlVerificarEmail, [email], function (erro, resultado) {
    if (erro) {
      console.error("Erro ao verificar o email:", erro);
      resultado.status(500).json({ mensagem: "Erro ao verifcar o email" });
      return;
    }

  });

});

// O express vai ouvir todas as requisições que vierem na porta 3000
app.listen(port, () => {
  // Essa frase embaixo vai ser renderizada no terminal do VS Code ao ligar o servidor
  console.log(`API da barbearia rodando em http://localhost:${port}`);
});