# Configuração do projeto

## Dependências:
Certifique-se de possuir as seguintes dependências instaladas em sua máquina:
- **node**: ^v12.13.0;
- **npm**: ^6.14.6;
- **yarn**: ^1.21.1 (opcional);

## Scripts
### Instalando dependências do projeto
```bash 
#usando npm
$ npm install

#usando yarn
$ yarn install
```
### Executando em modo desenvolvimento

```bash
#usando npm
$ npm run dev

#usando yarn
$ yarn dev
```

### Build

```bash
#usando npm
$ npm run build

#usando yarn
$ yarn build
```
### Get Started:
```bash 
$ yarn dev
```
```bash 
$ curl -d '{"investmentDate": "2016-11-14","cdbRate": 103.5,"currentDate": "2019-12-03"}' -H "Content-Type: application/json" -X POST http://localhost:3000/cdb/calculate-price
```


### Sobre o Projeto
- [README](../README.md);
- [Arquitetura](ARQUITETURA.md);
- [Infra-Estrutura](INFRA.md);
- [Sobre Modulos](MODULES.md);
- [Váriaveis de Ambiente](ENV.md);

