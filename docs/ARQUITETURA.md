# Arquitetura
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
| - modules/
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
* **configurations**: responsável por armazenar os diretórios das variáveis de ambiente. Os diretórios são montados de acordo com o ambiente que estão sendo executados, local, homologação, produção, etc;
* **docs**: documentação do projeto;
* **node_modules**;
* **src**: core do projeto;
  * **config**: ferramenta que irá gerenciar as variáveis de ambiente dentro do projeto;
  * **database**: faz o gerenciamento dos dados em csv
  * **interfaces**: contém as interfaces do tipos dados para facilitar implementações;
  * **log**: ferramenta que gera logs do sistema;
  * **mongodb**: gerecia a conexão com banco de dados mongo db;
  * **modules**: contém os modulos que a aplicação executa;
  * **Application.ts**: Classe que inicia todo o servidor.
* **.gitignore**;
* **.prettierrc**: configuração de identação
* **cdi_prices.csv**: dataset de calculos;
* **LICENSE**: licensa do projeto
* **nodemon.json**;
* **package.json**: Informaçoes do projeto e gerenciador de dependencias da aplicação;
* **Procfile**: comando para heroku;
* **README**;
* **yarn.lock**;

## Modulos:
Cada modulo deve ser construido utlizando o padrão de injeção de dependencia, onde cada objeto recebe suas dependencias externas via parâmetro em seu construtor. Cada modulo deve ter seu arquivo index, que é responsável por gerenciar as dependencias do modulo. As fucionalidades são divididas em rotas, controller, service e em alguns casos podemos tambem utilizar o utils e schema.
### Exemplo de criação de um modulo de 
### Sobre o Projeto
- [README](../README.md);
- [Depêndencias](DEPENDENCIAS.md);
- [Infra-Estrutura](INFRA.md);
- [Banco de Dados](BD.md);
- [Requisições HTTP](HTTP.md);