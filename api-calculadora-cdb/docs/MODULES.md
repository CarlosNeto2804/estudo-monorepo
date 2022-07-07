###  Criação de um modulo de hello
```ts
// src/modules/hello/hello.service.ts
export class HelloService{
  constructor() {}
  getMessage(name:string):string{
    return 'hello ' + name;
  }
}
```

```ts
// src/modules/hello/hello.controller.ts
import { Request, Response } from 'express'
import { HelloService } from './hello.service.ts'

export class HelloController{
  private static service: HelloService
  constructor(service: HelloService ) {}
  helloWithName(req: Request, res: Response): Response{
    const { name } = req.params as streing;
    const message:string = HelloController.service.getMessage(name);
    return res.status(200).send(message)
  }
}
```
```ts
// src/modules/hello/hello.route.ts
import { Application } from 'express'
import { HelloController } from './hello.controller.ts'

export class HelloRoute{
  constructor(app: Application, controller: HelloController ) {
    app.route('/hello/:name')
      .get(controller.helloWithName)
  }
}
```

```ts
// src/modules/hello/index.ts
import { Application } from 'express'
import { HelloController } from './hello.controller.ts'
import { HelloService } from './hello.service.ts'
import { HelloRoute } from './hello.route.ts'

export class Hello{
  constructor(app: Application) {
   const service = new HelloService()
   const controller = new HelloController(service);
   new HelloRoute(controller);
  }
}
```

Depois importar no arquivo src/modules/index.ts e registrar o novo modulo em [ModulesOfServices](../src/modules/index.ts)
```ts
// src/modules/index.ts
import { IServiceConstructor } from '../interfaces/IServiceConstructor';
import { Application } from 'express'
import { ModuleA } from './module-a'
import { Hello } from './hello'

export class ModulesOfServices{
  constructor(params: IServiceConstructor) {
   new ModuleA(params.app);
   new Hello(params.app);
  }
}
```

### Sobre o Projeto
- [README](../README.md);
- [Configurações do Projeto](DEPENDENCIAS.md);
- [Arquitetura](ARQUITETURA.md);
- [Infra-Estrutura](INFRA.md);
- [Váriaveis de Ambiente](ENV.md);
