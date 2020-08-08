import { Application } from 'express';
import { HomeController } from './home.controller';
/**
 * Fornece Informações sobre o projeto
 */
export class HomeIndex {
  /**
   * Fornece Informações sobre o projeto na roita raiz
   */
  constructor(app: Application) {
    new HomeController(app);
  }
}
