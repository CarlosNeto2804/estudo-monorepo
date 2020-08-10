import Express from 'express';
import pkg from '../../../package.json';
export class HomeController {
  constructor(private app: Express.Application) {
    this.app.get('/', (_, res) => {
      return res.send({
        server: pkg.name,
        description: pkg.description,
        vesion: pkg.version,
        author: pkg.author,
      });
    });
  }
}
