import { Application } from "express";
import { PassportStatic } from "passport";
import { IDataBase } from "./IDataBase";

export interface IServiceConstructor {
  app: Application;
  db: IDataBase<any>;
  passport: PassportStatic;
}
