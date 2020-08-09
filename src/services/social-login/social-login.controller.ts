import * as querystring from 'querystring';
import * as axios from 'axios';
import { Application, Response, Request } from 'express';
import { PassportStatic, AuthenticateOptions } from 'passport';
import { ConfigEnvVars } from '../../config';
import { IClientRespose } from '../../interfaces/IClientResponse';
interface AuthOptions {
  failureRedirect?: string;
  successRedirect?: string;
  scope?: string[];
}
export class SocialLoginController {
  /**
   * Feito de forma estatica pois o callback irá utilizar o this da prorpia função express
   * então não irá funcionar
   */
  private static configuration: ConfigEnvVars;
  constructor(
    private app: Application,
    private passport: PassportStatic,
    config: ConfigEnvVars
  ) {
    SocialLoginController.configuration = config;
    this.googleAuthRoutes();
    this.facebookAuthRoutes();
  }
  /**
   * - GOOGLE
   * - Rotas para autenticação e callback
   */
  private googleAuthRoutes() {
    this.app.get(
      '/social-login/google',
      this.authenticate('google', { scope: ['profile', 'email'] })
    );
    this.app.get(
      '/social-login/google/callback',
      this.authenticate('google', {}),
      this.authCallback
    );
  }
  /**
   * - FACEBOOK;
   * - Rotas para autenticação e callback
   */
  private facebookAuthRoutes() {
    this.app.get(
      '/social-login/facebook',
      this.authenticate('facebook', { scope: ['email'] })
    );

    this.app.get(
      '/social-login/facebook/callback',
      this.authenticate('facebook', {}),
      this.authCallback
    );
  }

  /**
   * - Faz uma requisição para o serviço de clinte
   * - Retorna ao front end
   */
  private authCallback(req: Request, res: Response) {
    /**
     * - Aqui é feito uma requisição http para o serviço de clientes,
     *    mas poderiamos alterar outro tipo de comunicação
     * - Não é necessário ser de forma sincrona,
     *    pois o serviço de login não irá depender
     *    do cliente salvo ele só obtem os dados;
     * - Simulando uma arquitetura de microserviços;
     */
    const clientService = SocialLoginController.configuration.get(
      'API_CLIENT_URL'
    );
    // axios.default.post(`${clientService}/recive-user`, req.user);

    /**
     * é feita uma cópia do objeto **user** da requisição para não alterar o original
     * esse tipo de craição de cópia é mais eficiente pois o ao utlizar o *Object.assign()*,
     * metodo não cria cópia dos possiveis objetos internos do **user**, abrindo espaço para
     * a alteração indevida de dados.
     */
    const copy = JSON.parse(JSON.stringify(req.user));
    const client: IClientRespose = {
      id: copy.id,
      displayName: copy.displayName,
    };
    const query: string = querystring.stringify(client);
    const appUrl: string = SocialLoginController.configuration.get('APP_URL');
    return res.redirect(`${appUrl}?${query}`);
  }

  private authenticate(strategy: string, opt?: AuthOptions) {
    const opt_parsed = opt as AuthenticateOptions;
    return this.passport.authenticate(strategy, opt_parsed); //realiza login com rede social
  }
}
