import { Request, Response } from 'express';
import { IClientDTO } from '../../interfaces/repo/IClient';
import { ClientService } from './client.service';

export class ClientController {
  private static service: ClientService
  constructor(service: ClientService) {
    ClientController.service = service;
  }
  async create(req: Request, res: Response): Promise<Response> {
    const client: IClientDTO = {
      provider: req.body.provider,
      _raw: req.body._raw,
      displayName: req.body.displayName,
      picture: req.body.photos[0].value ,
      email: req.body.emails[0].value,
      account_id: req.body.ids
    };
    await ClientController.service.save(client);
    return res.status(201);
  }
  async findAll(req: Request, res: Response): Promise<Response> {
    const clients = await ClientController.service.findAll();
    return res.status(200).send(clients);
  }
}
