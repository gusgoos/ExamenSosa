import { Request, Response } from "express";
import db from "../models";
import AbstractController from "./AbstractController";

class VideogameController extends AbstractController{
    private static _instance: VideogameController;

    public static get instance(): VideogameController {
        if (!this._instance) {
            this._instance = new VideogameController("videogame");
        }
        return this._instance;
    } 

    protected initRoutes(): void {
        this.router.post('/create', this.createVideogame.bind(this));
        this.router.get('/get/:id', this.getVideogame.bind(this));
    }

    private async createVideogame(req: Request, res: Response) {
        try {
            const videogame = await db.Videogame.create(req.body);
            res.status(201).json(videogame);
        } catch (error: any) {
            console.error(error);
            res.status(500).send('Internal server error: ' + error.message);
        }
    }

    private async getVideogame(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const videogame = await db.Videogame.findByPk(id);
            if (!videogame) {
                res.status(404).send('Videogame not found');
                return;
            }
            res.status(200).json(videogame);
        } catch (error: any) {
            console.error(error);
            res.status(500).send('Internal server error: ' + error.message);
        }
    }
}

export default VideogameController.instance;