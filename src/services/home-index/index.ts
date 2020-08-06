import Express from 'express'
import {HomeController} from './home.controler'
export class HomeIndex{
    constructor(app: Express.Application){
        new HomeController(app)
    }
}