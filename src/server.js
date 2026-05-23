// Importação que permite o Node ter acesso a ferramentas capazes de entender o pacote express  
const express = require("express");

// Importação que permite o Node ter acesso às ferramentas do MySQL, ou seja, permite falar e entender o MySQL do XAMPP (ou seja, se comunicar com o banco de dados) 
const mysql = require("mysql2");

// É o Express já executado 
const app = express();

// É a porta onde será executado o nosso projeto 
const port = 3000;

// Essa linha é uma função onde ela permite que o próprio Express entenda os arquivos em formato JSON 
app.use(express.json());


// Criando a conexão com o banco de dados do XAMPP (no caso, ele está apenas pegando as informações para que, se estiver tudo certo, o servidor consiga se conectar com o banco de dados)(Aqui ele so pega as informaçoes)
const connection = mysql.createConnection({
  // Essa linha mostra as informações para que o servidor consiga se conectar com o banco de dados no MySQL do XAMPP, se as informações estiverem corretas no MySQL.(E so o  gabarito das iformaçoes do banco ou seja o cracha)

  host: "localhost", // Essa linha significa que o banco de dados está rodando localmente nessa própria máquina 
  user: "root",      // Esse é o nome do usuário do banco de dados que o XAMPP cria por padrão (que no caso é o "root")
  password: "",      // Essa é a senha do usuário do banco de dados que o XAMPP cria por padrão (ela é vazia, ou seja, sem senha)
  database: "barbearia_db" // Esse é o nome do banco de dados que foi criado lá no MySQL do XAMPP, que no caso é (barbearia_db)

  // O servidor do XAMPP (no caso, o Apache) e o banco de dados não estão ativos por padrão. Você tem que ir lá no painel de controle e dar "Start" nos dois para que o servidor Apache e o banco de dados MySQL rodem, para que a aplicação seja executada corretamente.
});

connection.connect((erro) => {//Essa linha faz o node usar as informaçoes que foram passadas acima para ele tentar se conectar com o banco de dados, mas se essa conecção receber o erro ou seja se uma das informaçoes do gracha ou gabarito que estaão la em cima estiverem erradas a função vai receber o erro
  if (erro) {//Se a a funçaõ receber errro ele vai mostrar a mensagem do console error no terminal do vs code 
    console.error("Erro ao conectar ao banco de dados:", erro);
  } else {//Se a função n receber erro a conexão vai  ser estabelecida com sucesso e vai mopstrar a mensgaem do console logo no terminal do vs code 
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  }
});

//O express vai ouvir/renderizar tudo que vir da porta 3000
app.listen(port, () => {
  //essa farse em baixo vai ser redenrizada no terminal do vs code
  console.log(`API da barbearia rodando em http://localhost:${port}`);
});
