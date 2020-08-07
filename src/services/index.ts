import { IServiceConstructor } from '../interfaces/IServiceConstructor';
/* SERVICE */
import { CalculatorBankCertificatesDeposit } from './calculator-bank-certificates-deposit';
import { HomeIndex } from './home-index';
import { SocialLogin } from './social-login';

export class Services {
  constructor(params:IServiceConstructor) {
    new HomeIndex(params.app);
    new CalculatorBankCertificatesDeposit(params.app, params.db);
    new SocialLogin(params.app, params.passport);
  }
}
