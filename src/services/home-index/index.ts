import Express from 'express'
import {HomeController} from './home.controller'
export class HomeIndex{
    constructor(app: Express.Application){
        new HomeController(app)
    }
}