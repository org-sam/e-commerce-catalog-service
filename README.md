# Catalog Service

O **Catalog Service** é responsável pelo gerenciamento de produtos e controle de estoque do E-commerce Lab. Ele foi construído com **Node.js** e **NestJS**, utilizando **MongoDB** como banco de dados.

## Tecnologias

-   **Linguagem**: TypeScript
-   **Framework**: NestJS
-   **Banco de Dados**: MongoDB
-   **ODM**: Mongoose

## Variáveis de Ambiente

O serviço suporta as seguintes variáveis de ambiente (definidas no SO ou em arquivo `.env`):

| Variável | Descrição | Padrão |
| :--- | :--- | :--- |
| `MONGO_URI` | String de conexão do MongoDB | `mongodb://localhost:27017/catalog` |
| `PORT` | Porta do servidor (opcional) | `3001` (fixo no main.ts por enquanto) |

## Pré-requisitos

-   Node.js 22+
-   Docker (para rodar o banco de dados e o serviço containerizado)

## Como Executar

### 1. Banco de Dados (MongoDB)

O serviço depende de uma instância do MongoDB rodando. Você pode subir um container rapidamente:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

A string de conexão padrão é `mongodb://localhost:27017/catalog`.

### 2. Rodando Localmente (Desenvolvimento)

Instale as dependências e inicie o servidor em modo de desenvolvimento:

```bash
npm install
npm run start:dev
```

O serviço estará disponível em `http://localhost:3001`.

### 3. Rodando com Docker

Para construir e rodar a imagem do serviço:

```bash
# Build da imagem
docker build -t catalog-service .

# Rodar o container (conectando ao host para acessar o Mongo local, se necessário)
# Nota: Se o Mongo estiver em outro container, use network do docker ou host.docker.internal
docker run -p 3001:3001 --network host catalog-service
```

## API Endpoints

### Listar Produtos

Retorna a lista de todos os produtos disponíveis no catálogo.

-   **URL**: `/products`
-   **Método**: `GET`
-   **Resposta de Sucesso (200 OK)**:

```json
[
  {
    "_id": "657...",
    "name": "iPhone 15 Pro",
    "description": "The ultimate iPhone.",
    "price": 999,
    "imageUrl": "...",
    "stock": 100
  },
  ...
]
```

## Estrutura do Projeto

-   `src/products`: Módulo de produtos (Controller, Service, Schema).
-   `src/app.module.ts`: Módulo raiz com configuração do Mongoose.
-   `src/main.ts`: Ponto de entrada, configura porta 3001 e CORS.
