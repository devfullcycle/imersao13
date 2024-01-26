# Imersão Full Stack & FullCycle - Home Broker

## Descrição

Repositório da API feita com Nest.js (Broker)

**Importante**: A aplicação do Apache Kafka e Golang deve estar rodando primeiro.

## Configurar /etc/hosts

A comunicação entre as aplicações se dá de forma direta através da rede da máquina.
Para isto é necessário configurar um endereços que todos os containers Docker consigam acessar.

Acrescente no seu /etc/hosts (para Windows o caminho é C:\Windows\system32\drivers\etc\hosts):
```
127.0.0.1 host.docker.internal
```
Em todos os sistemas operacionais é necessário abrir o programa para editar o *hosts* como Administrator da máquina ou root.

## Rodar a aplicação

Dentro da pasta `nest` execute o comando abaixo para rodar os containers `Docker`:
```
docker compose up
```

Quando os containers estiverem prontos, precisamos acessar o container do `app` e executar a aplicação:

```
// entrar no container:
docker compose exec app bash

// instalar as dependências:
npm install

// executar o prisma:
npx prisma generate

// rodar a aplicação Nest
npm run start:dev
```

Espere os logs verdinhos do Nest para verificar se deu certo.

* Acessar POST http://localhost:3000/assets para criar as negociações.
* Acessar GET http://localhost:3000/assets para listar as negociações.

### Para Windows 

Lembrar de instalar o WSL2 e Docker. Vejo o vídeo: [https://www.youtube.com/watch?v=btCf40ax0WU](https://www.youtube.com/watch?v=btCf40ax0WU) 

Siga o guia rápido de instalação: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 