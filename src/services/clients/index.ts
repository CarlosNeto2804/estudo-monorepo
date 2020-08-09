import { Application } from 'express';
import { ClientRoutes } from './client.routes';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import clientSchema from './client.schema';
/**
 * - Gerencia os clientes que concordaram em utlizar o sistema
 */
export class Clients {
  /**
   * - Gerencia os clientes que concordaram em utlizar o sistema
   */
  constructor(app: Application) {
    const service = new ClientService(clientSchema);
    const controller = new ClientController(service);
    new ClientRoutes(app, controller);
  }
}
