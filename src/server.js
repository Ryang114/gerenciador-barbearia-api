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

app.post("/salvar-produto", (req, res) => { // O express vai receber os dados que vierem da rota /salvar-produto. Com o (req) eu consigo visualizar e pegar os dados enviados pelo usuário lá no formulário do frontend, e com o (res) eu consigo enviar uma resposta de volta para o frontend saber o que aconteceu.
  const { nome, preco } = req.body; // Vão ser criadas duas constantes (nome e preco) onde irão receber os valores que serão digitados pelo usuário lá no formulário do frontend. Aí eles virão para o servidor (que no caso é aqui no arquivo server.js com o Node).


  const sql = "INSERT INTO produtos (nome, preco) VALUES (?, ?)"; // Significa que o servidor vai criar uma nova constante chamada sql que vai servir como o comando para inserir o nome e preço do produto no banco de dados do MySQL do XAMPP. Os pontos de interrogação (?) são usados como coordenadas para mostrar a vaga onde os valores do nome e do preço serão inseridos (tipo nome primeiro e depois preço). Eles também servem como uma medida de segurança para evitar SQL Injection (ou seja, evitar que um usuário malicioso tente apagar ou roubar todo o banco de dados).


  // Ele vai usar o caminho criado pela const connection para adicionar um novo nome e preço no banco de dados quando eu colocar os dados lá no formulário do frontend e clicar em cadastrar. Os dados cadastrados (no caso nome e preco) vão ser enviados para o banco de dados do MySQL, e a função vai receber erro (por exemplo, se o XAMPP estiver desligado) ou, se não tiver nenhum erro, ele vai receber o resultado (que no caso significa que deu tudo certo).
  connection.query(sql, [nome, preco], (erro, resultado) => {

    if (erro) { // Se a função receber erro, ele vai mostrar a mensagem de erro detalhada no terminal do VS Code para o programador descobrir o problema.
      console.error("Erro ao salvar o produto:", erro); // Essa seria a mensagem de erro que seria exibida no terminal caso a função receba erro.
      res.status(500).json({ error: "Erro ao salvar o produto" }); // Essa linha envia uma resposta com o status 500 (Erro Interno do Servidor) e o texto do erro em formato JSON. Ela serve apenas para avisar o Frontend que a operação falhou, para que o Frontend sim exiba uma notificação de pop-up na tela para o usuário com essa mensagem.
    } else {
      res.json({ message: "Produto salvo com sucesso!" }); // Essa linha é a resposta de sucesso que o backend vai mandar em formato JSON caso não receba erro. Por padrão, ela já envia o status 200 (que indica sucesso). O Frontend vai receber esse pacote e poderá exibir um pop-up avisando ao usuário que o produto passou pelo servidor e foi salvo com sucesso no banco de dados.
    }
  });
})

app.post("/salvar-agendamento", (req, res) => {// O Express vai receber os dados que vierem da rota /salvar-agendamento. Com o (req) eu consigo visualizar e pegar os dados enviados pelo usuário lá no formulário frontend e com o (res) eu posso enviar uma resposta de volta para o frontend saber o que aconteceu.

  const { cliente, servico, data_hora, status } = req.body;// Vão ser criadas quatro variáveis (cliente, servico, data_hora e status) onde irão receber os valores digitados pelo usuário lá no formulário do frontend. Aí eles virão para o servidor (que no caso é no arquivo server com o Node).

  const sql = "INSERT INTO agendamentos (cliente, servico, data_hora, status) VALUES (?, ?, ?, ?)";// Significa que o servidor vai criar uma nova constante chamada sql que vai servir como o comando geral para inserir os agendamentos no banco de dados do MySQL do XAMPP. Onde ele vai inserir os valores na ordem que foi digitada pelo usuário que no caso é cliente, serviço, data_hora, status. Onde os pontos de interrogação (?) são usados como coordenadas para mostrar as vagas dos valores que serão inseridos (tipo cliente primeiro e depois serviço, data_hora e status). Eles também servem como medida de segurança para evitar SQL Injection (ou seja, evitar que o banco de dados seja apagado ou roubado). 

  connection.query(sql, [cliente, servico, data_hora, status || 'agendado'], (erro, resultado) => {// Aqui ele vai usar um novo caminho pela const connection para adicionar um novo agendamento no banco de dados quando eu colocar os dados no formulário do frontend e clicar em cadastrar. Os dados cadastrados no caso (cliente, serviço, data_hora e status) vão ser enviados para o banco de dados no MySQL do XAMPP e se ocorrer algum erro no caso se o XAMPP estiver desligado aí no caso ele não vai conseguir fazer a consulta e a função vai receber erro ou se não tiver nenhum erro ele vai receber a mensagem se deu tudo certo. 
    if (erro) {
      console.error("Erro em salvar o agendamento", erro);// No caso ele vai indicar essa mensagem de erro no terminal do VS Code sendo que depois vai dar um detalhamento ou dica do erro. 
      res.status(500).json({ error: "Erro ao salvar o agendamento" });// Aqui ele também vai indicar uma mensagem de erro só que essa mensagem de erro vai ser enviada para o frontend em formato JSON e vai ser exibida na tela do usuário com um pop-up avisando que deu erro.
    } else {
      res.json({ message: "Agendamento salvo com sucesso" });// Aqui também ele vai mandar uma mensagem em formato JSON onde ela vai ser exibida na tela do usuário frontend com um pop-up avisando que o agendamento foi salvo com sucesso no banco de dados do MySQL do XAMPP.
    }
  });

}); 
//Agora o proximo passo e fazer uma nova rota onde o usuario vai poder ver o proprio agendamento que ele cadastrou no xamp vou usar get para fazer isso nome da rota /salvar-agendamentos 

app.get ("/exibir-agendamentos", (req, res) => {
// Criar a const sql
});




// O express vai ouvir todas as requisições que vierem na porta 3000
app.listen(port, () => {
  // Essa frase embaixo vai ser renderizada no terminal do VS Code ao ligar o servidor
  console.log(`API da barbearia rodando em http://localhost:${port}`);
});