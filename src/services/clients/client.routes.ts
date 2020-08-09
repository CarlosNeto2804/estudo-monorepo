import { Application } from 'express';
import { ClientController } from './client.controller';
export class ClientRoutes{
    constructor(app:Application, controller: ClientController){
        app.route('/client-service')
            .post(controller.create)
    }
}
