# Arquitetura
Aplicação estruturada em modulos de serviços, onde cada serviço atua de forma isolada, facilitando a migração para uma aquitetura de microserviços.
Cada serviço deve ser construido utlizando o padrão de injeção de dependencia, onde cada objeto recebe suas dependencias externas via parâmetro em seu construtor. Cada serviço deve ter seu arquivo index, que é responsável por gerenciar as dependencias do serviço;

```text

- configurations
|  - exemple
|  - local
|  - production
- docs
- node_modules
- src
| - config/index.ts
| - database/
  | - index.ts
  | - LoaderCSV.ts
| - interfaces/
| - log/index.ts
| - mongodb/index.ts
| - services
  | - calculator-bank-certificates-deposit/
  | - clients/
  | - home-index/
  | - social-login/
  | - index.ts
| - Applications.ts
- .gitignore
- .prettierrc
- cdi_prices.csv
- LICENSE
- nodemon.json
- package.json
- Procfile
- README.md
- yarn.lock
```