# 🧠 Desafio Backend (API) - Fullstack Developer

Esta é uma **API RESTful** para gerenciar usuários, podendo ser consumida por um frontend.

---

## ⚙️ Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- MySQL (via Docker)
- TypeORM (ORM para banco)
- Jest (testes unitários)
- class-validator (validação de DTOs)
- Docker e Docker Compose

---

## 🎯 Funcionalidades da API

- `POST /users/auth/login` — login com e-mail e senha
- `DELETE /users/auth/logout` — logout e invalidação do token
- `GET /users` — listagem de usuários
- `POST /users` — criação de usuário
- `PUT /users/:id` — edição de usuário
- `DELETE /users/:id` — remoção de usuário

> A autenticação é feita via JWT.

---

## 📁 Estrutura do Projeto

jk-backend-challenge/
├── src/
| ├── config/
│ ├── controllers/
│ ├── database/
│ │ ├── migrations/
│ │ └── seed/
| ├── dtos/
│ ├── entities/
│ ├── middlewares/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── index.ts
├── .env.example
├── docker-compose.yml
├── tsconfig.json
├── package.json
└── README.md

---

## 🔧 Configuração do Ambiente

### .env

Crie um arquivo `.env` copiando o `.env.example` e ajustando conforme necessário:

DB_HOST=mysql
DB_PORT=3306
DB_USER=jk_user
DB_PASSWORD=suasenha
DB_NAME=desafio_fullstack
JWT_SECRET=seusegredojwt


> Observação: `DB_HOST` será o nome do serviço MySQL no Docker Compose (`mysql`).

---

## 🐳 Rodando com Docker

1. **Criar o `docker-compose.yml`** (exemplo):

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    container_name: desafio_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: desafio_fullstack
      MYSQL_USER: jk_user
      MYSQL_PASSWORD: suasenha
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

2. **Subir os containers:**
```bash
docker-compose up -d
```

---

## 📂 Modelagem do Banco

**Tabela base de usuários**

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  type ENUM('individual', 'business') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Pessoa Física**
```sql
CREATE TABLE individual_person (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  birth_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Pessoa Jurídica**
```sql
CREATE TABLE business_person (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  fantasy_name VARCHAR(100) NOT NULL,
  cnpj VARCHAR(18) NOT NULL UNIQUE,
  company_name VARCHAR(100),
  job_title VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🛠️ Instalação e Execução (Guia Rápido)

Este guia o levará pelos passos necessários para rodar o projeto localmente.

### 1. Configuração Inicial (Setup)

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd jk-backend-challenge
    ```
2.  **Variáveis de Ambiente:** Crie o arquivo `.env` na raiz do projeto, baseado no modelo `.env.example`, e preencha as variáveis.

3.  **Instale as dependências Node.js:**
    ```bash
    npm install
    ```

### 2. Subindo o Banco de Dados (Docker)

O projeto usa Docker para orquestrar o banco de dados.

4.  **Inicie os containers Docker** (o banco de dados será inicializado):
    ```bash
    docker-compose up -d
    ```
5.  **Rode as Migrações:** Execute os scripts para criar a estrutura do banco de dados (tabelas):
    ```bash
    npm run migration:run
    ```
6.  **Rode as Seeds:** Execute os scripts para criar a estrutura do banco de dados (tabelas):
    ```bash
    npm run seed:run
    ```

### 3. Iniciando a Aplicação

7.  **Inicie a Aplicação** em modo de desenvolvimento:
    ```bash
    npm run dev
    ```
8.  **Teste os Endpoints:** Os *endpoints* da API agora estão ativos e podem ser testados usando ferramentas como **Postman**, **Insomnia** ou através da **documentação Swagger**.
