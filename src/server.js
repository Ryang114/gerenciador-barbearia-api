//Importação que permite o node ter acesso a ferramentas capas de entender o  pacote express  
const express = require("express");

// Importação que permite o node ter acesso as ferramnetas do mysl ou seja permite falar e enteder o mysql do xampp (ou seja se comunicar com o banco de dados) 
const mysql = require("mysql2");

// E o express ja executado 
const app = express();

//E a porta onde sera executado o nosso projeto 
const port = 3000;

//Essa linha e a função do onde ele permite que o proprio express entenda os arquivos em formato json 
app.use(express.json());


//O express vai executuatar o servidor e vai redenrizar o arquivo a resposta que o servidor foi cirado com sucesso se o processo der certo 
app.get("/", (request, response) => {
  response.send("Tudo deu certo por aqui!<br><br>O servidor foi criado com sucesso!");
});


//O express vai ouvir/renderizar tudo que vir da porta 3000
app.listen(port, () => {
  //essa farse em baixo vai ser redenrizada no terminal do vs code
  console.log(`API da barbearia rodando em http://localhost:${port}`);
});
