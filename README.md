# Gerenciador de Barbearia - API

API do projeto **Gerenciador de Agendamentos de Barbearia**.

Este backend recebe pedidos do frontend, valida dados, conversa com o banco MySQL/MariaDB do XAMPP e devolve respostas em JSON.

## Tecnologias

- Node.js
- Express
- MySQL/MariaDB
- XAMPP
- mysql2
- cors
- JavaScript

## Estado Atual

A API atualmente possui:

- Conexao com o banco `barbearia_db`.
- Rota de cadastro de usuarios.
- Rota de login de usuarios.
- Validacoes iniciais de campos obrigatorios, senha e email repetido.

## Como Rodar

1. Abra o **XAMPP Control Panel**.
2. Clique em **Start** no **MySQL**.
3. Abra um terminal dentro da pasta `backend`.
4. Instale as dependencias, se ainda nao tiver instalado:

```bash
npm install
```

5. Inicie a API:

```bash
npm run dev
```

Se tudo estiver certo, o terminal deve mostrar algo parecido com:

```txt
API da barbearia rodando em http://localhost:3000
Conexao com o banco de dados estabelecida com sucesso.
```

## Banco De Dados

Banco usado localmente:

```txt
barbearia_db
```

Tabela usada no fluxo atual de autenticacao:

```txt
usuarios
```

Colunas esperadas na tabela `usuarios`:

```txt
id
nome
email
telefone
senha
```

## Rotas Da API

### POST /cadastro

Cadastra um novo usuario.

Dados esperados no corpo da requisicao:

```json
{
  "nome": "Ryan",
  "email": "ryan@email.com",
  "telefone": "11999999999",
  "senha": "123456",
  "confirmarSenha": "123456"
}
```

Exemplo de teste no PowerShell:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/cadastro" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"nome":"Ryan","email":"ryan@email.com","telefone":"11999999999","senha":"123456","confirmarSenha":"123456"}'
```

Possiveis respostas:

```json
{
  "mensagem": "usuario cadastrado com sucesso id gerado com sucesso",
  "idUsuario": 1
}
```

```json
{
  "mensagem": "Todos os campos sao obrigatorios"
}
```

```json
{
  "mensagem": "As senhas nao sao iguais"
}
```

```json
{
  "mensagem": "esse email ja esta cadastrado"
}
```

### POST /login

Faz login de um usuario ja cadastrado.

Dados esperados no corpo da requisicao:

```json
{
  "email": "ryan@email.com",
  "senha": "123456"
}
```

Exemplo de teste no PowerShell:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3000/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"ryan@email.com","senha":"123456"}'
```

Resposta esperada em caso de sucesso:

```json
{
  "mensagem": "login feito com sucesso!",
  "usuario": {
    "id": 1,
    "nome": "Ryan",
    "email": "ryan@email.com"
  }
}
```

Possiveis erros:

```json
{
  "mensagem": "Todos os campos devem estar preenchidos"
}
```

```json
{
  "mensagem": "Email ou senha icorretos"
}
```

## Observacoes Importantes

Este projeto ainda esta em fase de aprendizado. No momento, a senha e salva diretamente no banco. Em uma aplicacao real, o correto e usar criptografia, por exemplo com `bcrypt`.

Tambem sera importante separar o arquivo `server.js` em partes menores quando o projeto crescer.

## Proximos Passos

- Conectar as telas de cadastro e login do React com esta API.
- Criar uma tela apos o login.
- Reintroduzir ou evoluir as rotas de agendamento.
- Adicionar criptografia de senha.
- Organizar o backend em arquivos separados.
