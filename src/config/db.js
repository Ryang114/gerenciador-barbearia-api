// Importação que permite o Node ter acesso às ferramentas do MySQL, ou seja, permite falar e entender o MySQL do XAMPP (ou seja, se comunicar com o banco de dados) 
const mysql = require("mysql2");

// Criando a conexão com o banco de dados do XAMPP (no caso, ele está apenas pegando as informações para que, se estiver tudo certo, o servidor consiga se conectar com o banco de dados)(Aqui ele só pega as informações)
const connection = mysql.createConnection({
  // Essa linha mostra as informações para que o servidor consiga se conectar com o banco de dados no MySQL do XAMPP, se as informações estiverem corretas no MySQL. (É só o gabarito das informações do banco, ou seja, o crachá)

  host: "localhost", // Essa linha significa que o banco de dados está rodando localmente nessa própria máquina 
  user: "root",      // Esse é o nome do usuário do banco de dados que o XAMPP cria por padrão (que no caso é o "root")
  password: "",      // Essa é a senha do usuário do banco de dados que o XAMPP cria por padrão (ela é vazia, ou seja, sem senha)
  database: "barbearia_db" // Esse é o nome do banco de dados que foi criado lá no MySQL do XAMPP, que no caso é (barbearia_db)

  // O servidor do XAMPP (no caso, o Apache) e o banco de dados não estão ativos por padrão. Você tem que ir lá no painel de controle e dar "Start" nos dois para que o servidor Apache e o banco de dados MySQL rodem, para que a aplicação seja executada corretamente.k
});

connection.connect((erro) => { // Essa linha faz o Node usar as informações que foram passadas acima para ele tentar se conectar com o banco de dados. Mas se essa conexão receber um erro (ou seja, se uma das informações do crachá ou gabarito que estão lá em cima estiverem erradas), a função vai receber o erro.
  if (erro) { // Se a função receber erro, ele vai mostrar a mensagem do console.error no terminal do VS Code 
    console.error("Erro ao conectar ao banco de dados:", erro);
  } else { // Se a função não receber erro, a conexão vai ser estabelecida com sucesso e vai mostrar a mensagem do console.log no terminal do VS Code 
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  }
});


// aqui ele vai exportar a conecção do banco dados my SQL para ser utilizada na pasta "models" onde ela e responsavel por cudar dos comandos sql  
module.exports = connection