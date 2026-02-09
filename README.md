# 🧠 Mundo Geek API

API REST desenvolvida como atividade prática do módulo de **Back-end** da capacitação **#indtEducacional**.  
O projeto simula o backend de uma loja geek, com gerenciamento de **Categorias** e **Produtos**, aplicando boas práticas de arquitetura, validação, segurança e organização de código.

---

## 📌 Objetivo do Projeto

Construir uma API REST utilizando **Node.js + TypeScript + Express + TypeORM**, aplicando:

- Arquitetura em camadas
- Validação de dados com Zod
- Tratamento centralizado de erros
- Relacionamento 1:N entre entidades
- Boas práticas de segurança e observabilidade
- Persistência em banco PostgreSQL

---

## 🏗️ Arquitetura da Solução

A aplicação segue o padrão de **Arquitetura em Camadas**, separando claramente responsabilidades.

src/ <br/>
├── app.ts # Ponto de entrada da aplicação <br/>
├── dataBase/ <br/>
│ └── appDataSource.ts # Configuração do TypeORM <br/>
├── entities/ <br/>
│ ├── Categoria.ts <br/>
│ └── Produto.ts <br/>
├── schemas/ # Validações com Zod <br/>
│ ├── categoria.schema.ts <br/>
│ └── produto.schema.ts <br/>
├── services/ # Regras de negócio <br/>
│ ├── CategoriaService.ts <br/>
│ └── ProdutoService.ts <br/>
├── controllers/ # Camada HTTP <br/>
│ ├── CategoriaController.ts <br/>
│ └── ProdutoController.ts <br/>
├── routes/ # Definição das rotas <br/>
│ ├── categoria.routes.ts <br/>
│ └── produto.routes.ts <br/>
├── middlewares/ <br/>
│ ├── validateSchema.ts <br/>
│ └── errorHandler.ts <br/>
├── errors/ <br/>
│ └── AppError.ts <br/>
└── types/ <br/>
├── CategoriaType.ts <br/>
└── ProdutoType.ts <br/>

---


### 📊 Diagrama Simplificado

Request <br/>
↓ <br/>
Routes <br/>
↓ <br/>
Controller <br/>
↓ <br/>
Service <br/>
↓ <br/>
Database (TypeORM) <br/>
↑ <br/>
Error Handler <br/>


---

## 🎯 Decisões de Design

### 🔹 TypeScript
Escolhido para garantir:
- Tipagem forte
- Melhor legibilidade
- Menos erros em tempo de execução

---

### 🔹 TypeORM
Utilizado para:
- Mapeamento objeto-relacional (ORM)
- Facilidade na criação de entidades
- Gerenciamento de relacionamentos (1:N)

---

### 🔹 Zod
Responsável pela validação de entrada:
- Garante dados válidos antes de chegar ao service
- Evita regras de negócio espalhadas pelo controller

---

### 🔹 AppError + Error Handler
Centralização total do tratamento de erros:
- Services lançam erros de negócio
- Middleware converte erros em respostas HTTP adequadas

---

## 🧩 Divisão de Responsabilidades

### 🧱 Controllers
- Lidam apenas com HTTP (req/res)
- Não possuem regras de negócio

### ⚙️ Services
- Contêm toda a lógica de negócio
- Interagem com o banco de dados
- Lançam erros quando regras são violadas

### 🛡️ Middlewares
- Validação de dados (Zod)
- Tratamento global de erros
- Segurança (rate limit, helmet)

### 🧬 Schemas
- Garantem que dados de entrada estejam corretos
- Evitam validações duplicadas

---

## 🗃️ Entidades do Sistema

### 📂 Categoria
- `id`
- `nome` (único)
- `descricao`
- `dataCriacao`
- `dataAtualizacao`

### 📦 Produto
- `id`
- `nome`
- `descricao`
- `preco` (> 0)
- `estoque` (>= 0)
- `categoria` (ManyToOne)
- `dataCriacao`
- `dataAtualizacao`

Relacionamento:
- Uma **Categoria** possui vários **Produtos**
- Um **Produto** pertence a uma **Categoria**

---

## 🔐 Regras de Negócio Implementadas

- Nome da categoria deve ser **único**
- Preço do produto deve ser **maior que zero**
- Estoque não pode ser negativo
- Produto deve pertencer a uma categoria existente

---

## 🚀 Como Rodar o Projeto Localmente

### 📋 Pré-requisitos
- Node.js >= 18
- Docker e Docker Compose
- Git

---

### 🐘 Subindo o Banco de Dados

```bash
docker-compose up -d
```

```bash
npm install
```
### Arquivo .env

```bash
PORT=6060
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=mundo_geek

```

