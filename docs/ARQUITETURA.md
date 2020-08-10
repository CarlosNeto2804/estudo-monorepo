# Arquitetura
Aplicação estruturada em modulos de serviços, onde cada serviço atua de forma isolada, facilitando a migração para uma aquitetura de microserviços.
Cada serviço deve ser construido utlizando o padrão de injeção de dependencia, onde cada objeto recebe suas dependencias externas via parâmetro em seu construtor. Cada serviço deve ter seu arquivo index, que é responsável por gerenciar as dependencias do serviço;

## Organização do Projeto
```text
- configurations
|  - exemple/
|  - local/
|  - production/
- docs/
- node_modules/
- src/
| - config/
| - database/
| - interfaces/
| - log/
| - mongodb/
| - services/
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
## Diretórios
- **configurations**: responsável por armazenar os diretórios das variáveis de ambiente. Os diretórios são montados de acordo com o ambiente que estão sendo executados, local, homologação, produção, etc.





### Sobre o Projeto
- [README](../README.md);
- [Depêndencias](DEPENDENCIAS.md);
- [Infra-Estrutura](INFRA.md);
- [Banco de Dados](BD.md);
- [Requisições HTTP](HTTP.md);