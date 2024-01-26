# Imersão Full Stack & FullCycle - Home Broker

## Descrição

Repositório do front-end feito com Next.js (Front-end Home Broker)

**Importante**: A aplicação do Apache Kafka, Golang e Nest.js deve estar rodando primeiro.

## Configurar /etc/hosts

A comunicação entre as aplicações se dá de forma direta através da rede da máquina.
Para isto é necessário configurar um endereços que todos os containers Docker consigam acessar.

Acrescente no seu /etc/hosts (para Windows o caminho é C:\Windows\system32\drivers\etc\hosts):
```
127.0.0.1 host.docker.internal
```
Em todos os sistemas operacionais é necessário abrir o programa para editar o *hosts* como Administrator da máquina ou root.

## Rodar a aplicação

Execute os comandos:

```
// rodar o container Next:
docker compose up

// instalar as dependências:
npm install

// executar a aplicação:
npm run dev
```

Acessar http://localhost:3001 para ver as operações.

### Para Windows 

Lembrar de instalar o WSL2 e Docker. Vejo o vídeo: [https://www.youtube.com/watch?v=btCf40ax0WU](https://www.youtube.com/watch?v=btCf40ax0WU) 

Siga o guia rápido de instalação: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 

GET /wallets/wallet1/orders

POST /wallets/wallet1/orders