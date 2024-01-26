# Imersão Full Stack && Full Cycle

Participe: https://imersao.fullcycle.com.br

## Microsserviço Trader

Esse microsserviço tem o objetivo de ser um Trader da bolsa de valores.

## Configurar /etc/hosts

A comunicação entre as aplicações se dá de forma direta através da rede da máquina.
Para isto é necessário configurar um endereços que todos os containers Docker consigam acessar.

Acrescente no seu /etc/hosts (para Windows o caminho é C:\Windows\system32\drivers\etc\hosts):
```
127.0.0.1 host.docker.internal
```
Em todos os sistemas operacionais é necessário abrir o programa para editar o *hosts* como Administrator da máquina ou root.

## Como executar

Utilizamos Docker para que todos os serviços que utilizaremos fiquem disponíveis.

- Tendo o docker instalado em sua máquina e estando na pasta `go` apenas execute:

`docker compose up -d`

### Como executar a aplicação

- Rode `go run cmd/trade/main.go`

**Importante:** Esse código está sendo disponibilizado conforme o andamento das aulas, logo, o arquivo para executar o projeto talvez ainda não tenha sido criado.

### Serviços utilizados ao executar o docker-compose

- Apache Kafka
- Criador dos tópicos a serem utilizados pelo Kafka
- Confluent control center
- ZooKeeper

---