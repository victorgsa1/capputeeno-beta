# E-commerce Capputeeno ☕
Este é um projeto de e-commerce para a venda de canecas e camisetas com as seguintes funcionalidades:

## Funcionalidades Principais:
- Catálogo de Produtos:
Exibe todos os produtos disponíveis com paginação.

- Filtragem por Categoria:
Permite filtrar os produtos por categoria, como "Canecas" ou "Camisetas".

- Busca por Nome do Produto:
Permite buscar produtos pelo nome.

- Adicionar e Remover Produtos do Carrinho:
Os usuários podem adicionar produtos ao carrinho, onde podem revisar e remover itens.

## Tecnologias Utilizadas:
- Next.js e Typescript para o desenvolvimento.
- ChakraUI e Styled-components para estilização.
- Local Storage para gerenciamento do carrinho.
- Consumo de uma API GraphQL por meio do Apollo Client.

Instruções de Instalação
Para executar o projeto em sua máquina local, siga estas etapas.

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

Navegue até a pasta raiz do projeto:
```bash
cd raiz-do-projeto
```

Instale as dependências do projeto:

```bash
npm install
# ou 
yarn add
```

Navegue até a pasta pages/api:

```bash
cd pages/api
```

Dentro da pasta pages/api, instale as dependências específicas da API:

```bash
npm install
# ou
yarn add
```

Volte à pasta raiz do projeto:
```bash
cd ../..
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

Em um terminal separado, inicie a API GraphQL:
```bash
cd pages/api
npm start
# ou
yarn start
```

Agora você pode acessar a aplicação em seu navegador em http://localhost:3000.
