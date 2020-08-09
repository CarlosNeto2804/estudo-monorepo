import { IServiceConstructor } from '../interfaces/IServiceConstructor';
/* SERVICES */
import { CalculatorBankCertificatesDeposit } from './calculator-bank-certificates-deposit';
import { Clients } from './clients';
import { HomeIndex } from './home-index';
import { SocialLogin } from './social-login';
/**
 * - Classe Pricipal que inicia os serviços/modulos da aplicacao
 * - Possui finalidade de centralizar e gerenciar os serviços
 * - É responsável por iniciar e injetar as dependencias serviços
 * - Foi modelada dessa forma para não deixar a aplicação injessada, pois se for preciso migrar
 *  para uma arquitetura de micrserviços, por exemplo, será mais simples, pois cada serviço, recebe suas
 *  dependencias  via injeção (Inject) então bastará migrar e fornecer os parametros necessários
 */
export class Services {
  constructor(params: IServiceConstructor) {
    new CalculatorBankCertificatesDeposit(params.app, params.db);
    new Clients(params.app)
    new HomeIndex(params.app);
    new SocialLogin(params.app, params.passport);
  }
}
