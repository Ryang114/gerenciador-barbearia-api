// Importação que permite o Node ter acesso a ferramentas capazes de entender o pacote express  
const express = require("express");

// Importação que permite o Node ter acesso às ferramentas do MySQL, ou seja, permite falar e entender o MySQL do XAMPP (ou seja, se comunicar com o banco de dados) 
const mysql = require("mysql2");

// É uma importação que permite que o node tenha acesso a ferramenta cors que é uma ferramenta de segurança que faz com que o node e o backend se comuniquem com o frontend já que eles estão em portas diferentes (o backend está na porta 3000 e o frontend está na porta 5173).
const cors = require("cors");

// É o Express já executado 
const app = express();

// É a porta onde será executado o nosso projeto 
const port = 3000;

// Essa linha é uma função que permite o node e o express (que são o backend) terem acesso ao cors que é uma ferramenta que permite o backend se comunicar com o frontend (que no caso é o react) que estão em portas diferentes.
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

//Aqui eu estou criando a rota de cadastro onde ele vai receber os dados do usuário que vierem do frontend e vai fazer a validação desses dados de acordo com as regras que eu criei e depois ele vai mandar esses dados para o banco de dados se todas as regras forem atendidas e o usuário cadastrado vai para o banco de dados.
app.post("/cadastro", function (req, res) {
  //Essas variáveis são as informações que o usuário vai pegar do front e vai mandar para o back para que os dados sejam validados conforme as regras que eu criei e depois essas informações vão para o banco de dados.
  const { nome, email, telefone, senha, confirmarSenha } = req.body;

  //Regras
  //1 REGRA: Se algum dos campos nome, email, telefone e confirmar senha estiver vazio, ele vai retornar erro tanto no servidor quanto no frontend e não vai deixar o cadastro seguir.
  if (!nome || !email || !telefone || !senha || !confirmarSenha) {
    console.error("Server: todos os campos são obrigatórios");
    res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    return;
  }
  //REGRA 2: Se a senha e a confirmação de senha forem diferentes, ele vai retornar erro no servidor e no frontend e não vai deixar o cadastro seguir 
  if (senha !== confirmarSenha) {
    console.log("As senhas não são iguais");
    res.status(400).json({ mensagem: "As senhas não são iguais" });
    return;
  }
  //Aqui vai começar a regra 3 mas nessa linha estou criando uma nova variável que vai ser usada meio que para verificar se o email do usuário já existe no banco de dados mysql do xampp (está apenas guardando o comando na variável).
  const sqlVerificarEmail = "SELECT * FROM usuarios WHERE email = ?";
  //Aqui ele vai fazer a verificação do email em si onde ele verifica se o email da variável está no banco de dados sql.
  connection.query(sqlVerificarEmail, [email], function (erro, resultado) {
    //Aqui é a REGRA 3 em si onde ele vai verificar se o email do usuário já está cadastrado no banco de dados mysql se o email já estiver cadastrado ele vai retornar erro tanto no terminal quanto no frontend e não vai deixar o cadastro seguir 
    if (erro) {
      console.error("Erro ao verificar o email:", erro);
      res.status(500).json({ mensagem: "Erro ao verificar o email" });
      return;
    }

    //Aqui é a parte 2 da REGRA 3 onde ele vai verificar se o email do usuário já está cadastrado no banco de dados se o email já estiver cadastrado vai retornar erro tanto no terminal quanto no frontend e não vai deixar o cadastro seguir o email ele não pode existir então ele não teria que ser igual a 0 porque ele não existe
    if (resultado.length > 0) {
      res.status(400).json({ mensagem: "esse email ja esta cadastrado" });
      return;
    }
    //Aqui começa a REGRA 4 onde nós vamos criar uma nova variável que vai ser usada para guardar as variáveis que vão ser inseridas pelo usuário no frontend vão p o backend vão ser enviadas para o banco de dados.
    const sqlInserirUsuario = "INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?,?,?,?)";

    //Aqui está a consulta em si onde ele vai conferir se as variáveis inseridas no banco de dados enviadas com todas as regras anteriores estiverem corretas se não ela vai retornar erro tanto no terminal quanto no front e não vai deixar o cadastro seguir 
    connection.query(sqlInserirUsuario, [nome, email, telefone, senha], function (erro, resultado) {
      if (erro) {
        console.error("Erro em cadastrar o usuario:", erro);
        res.status(500).json({ mensagem: "Erro ao cadastrar usuario" });
        return;
      }
      //Aqui é se der tudo certo ele vai retornar a mensagem de sucesso tanto no terminal quanto no frontend e vai mostrar que o id do usuário foi gerado com sucesso
      console.log("Usuario cadastrado com sucesso");
      res.status(201).json({ mensagem: "usuario cadastrado com sucesso id gerado com sucesso", idUsuario: resultado.insertId });
      return;
    });
  });
});

//ROTA DE LOGIN (POST /login)
//Aqui e a função da rota login mesmo onde ele tem a funçao de receber os dados que vão ser digitados no frontend  
app.post("/login", function (req, res) {
  // Passo 1: Receber os dados (email e senha) enviados pelo frontend no corpo da requisição (req.body).

  const { email, senha } = req.body;//Aqui são as informaçoes ( os campos) onde o usaurio vai digitar no forntend e vai enviar para backend 

  // Passo 2: Validar se os campos obrigatórios foram preenchidos (se email ou senha estão vazios). Se faltar algum, retorna erro 400.

  //Essa e uma regra que eu fiz para quew os dois capos precisam estar prechidos para que o beckend consiga buscar o usuario cadastrado depois que o usauri clicar no botão 
  if (!email || !senha) {
    console.error("Todos os campos devm estar preechidos");
    res.status(400).json({ mensagem: "Todos os campos devem estar preenchidos" });
    return;
  }

  // Passo 3: Buscar o usuário no banco de dados MySQL pelo e-mail (SELECT * FROM usuarios WHERE email = ?).
  //Ele vai buscar o usaurio aqui pelo email 


  //Aqui eu criei uma const para busacar o usaurio ja cadastrado no bacoo de dados pelo email ja cadastrado por ele pelo banco de dados e o ponto de interrrogação (?) cerve para evitar o qualquer ataque atraves do my sql injection
  const BuscarEmailExistenteSQL = "SELECT * FROM usuarios WHERE email = ?";

  // - Se o banco der erro, retorna 500.

  //Aqui o bakend vai fazer uma consulta ao banco de dados atrabves da constante buscar email exitente SQL procurando na constante email o email mas se o banco de dados apresentar alguma falha ou n tiver fucionando o usario ja cadastrado n vai poder logar na sua conta ou seja não vai poder efetuar login 
  connection.query(BuscarEmailExistenteSQL, [email], function (erro, resultado) {
    if (erro) {
      console.error("Erro em encontrar usuario no banco de dados", erro);
      res.status(500).json({ mensagem: "Erro em encontrar usaurio no banco de dados " });
      return;
    }
    //Dessa ponto em diante começam as regras de validação dos inpuits para que os dadso do usaurio sejam validados
    
    
    // - Se o e-mail NÃO for encontrado (resultado.length === 0), retorna erro 401 ("E-mail ou senha incorretos").

    //Essa aqui eu coquei para que se o imail procurado pelo usuario pela busca no banco n exitir vai aparcer para o usauriop email ou senha n encontrado 
    if (resultado.length === 0) {
      console.log("Email não encontrado");
      res.status(401).json({ mensagem: "Email ou senha icorretos" });
      return;
    }
    // Passo 4: Se o e-mail existir, comparar a senha digitada com a senha salva no banco (resultado[0].senha)

    // Aqui eu criei uma nova variavel chamada usuario enicotrado onde ela tem a função de com base no comparar a senha dugitada no frontend pelo usaurio com a senha salva no banco de dados com base no email salvo no banco de dados e quardar o primeor intem da lista de acordo com o banco de dados 
     
    const usuarioEncontrado = resultado[0];

    //Desse ponto em diante são as regras que eu coloquei para filtrar as situaçoes  

    //REGRA 1 - Se a senha salva no banco de dados for diferente da senha digitada pelo usuario no frontend vai retornar a mensagem pa o usuario email ou senha incorretos

    // - Se as senhas forem diferentes, retorna erro 401 ("E-mail ou senha incorretos"). 
    if (usuarioEncontrado.senha !== senha) {
      console.log("A senha esta incorreta");
      res.status(401).json({ mensagem: "Email ou senha icorretos" });
      return;
    }

    // - Se as senhas forem iguais, retorna status 200 (Sucesso!) e envia os dados do usuário para o frontend logar.
    // Já se as senhas forem iquais vai retornar a mensagem para o usuario o usuario fez o login com sucesso 
    console.log("O usuario fez o login com sucesso");
    res.status(200).json({
      mensagem: "login feito com sucesso!",
      usuario: {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email
      }
    });
  });
});

// O express vai ouvir todas as requisições que vierem na porta 3000
app.listen(port, () => {
  // Essa frase embaixo vai ser renderizada no terminal do VS Code ao ligar o servidor
  console.log(`API da barbearia rodando em http://localhost:${port}`);
});