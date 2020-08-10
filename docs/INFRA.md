# Infra-Estrutura 
## Serviço de Banco de Dados
Foi utilizado o [Mongo DB](https://www.mongodb.com) para armazenamento dos dados por meio do [mLab](https://mlab.com/welcome/), porém, atualmente ao tentar se cadastrar ele redireciona para seu novo serviço o [Mongo DB Atlas](https://www.mongodb.com/cloud/atlas). O serviço fornece a criação de banco de dados https://www.mongodb.com/cloud/atlasde maneira gratuita com 500 mb de armazenamento, ideal para ambientes de desenvolvimento e homologação. Como nada é instalado na máquina do desenvolvedor, problemas como versão e compatibilidade não ocorrem e como os dados são salvos na cloud não há o risco de perca de dados por erros de hardware.
## Serviço de Hospedagem
A aplicação foi hospedada no [Heroku](https://heroku.com) uma plataforma de cloud que oferece "Platform as a Service", ou seja, ele permite que você hospede suas aplicações em um ambiente facilmente escalável e com suporte a várias tecnologias. Ele tem um plano free, que é indicado para testes, e opções pagas com mais funcionalidades e suporte. Se um aplicativo tiver um dinamômetro da web gratuito e esse dinamômetro não receber tráfego da web em um período de 30 minutos, ele entrará em suspensão. Além do dinamômetro da web, o dinamômetro (se houver) também dormirá. Em seu plano gratuito caso não receba tráfego da web em um período de 30 minutos, ele entrará em suspensão. Ao receber tráfego da web, ele se tornará ativo novamente, logo a primeira requisição terá um tempo maior de reposta
### Sobre o Projeto
- [README](../README.md);
- [Configurações do Projeto](DEPENDENCIAS.md);
- [Arquitetura](ARQUITETURA.md);
- [Sobre Modulos](MODULES.md);
- [Váriaveis de Ambiente](ENV.md);
