"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const AbstractController_1 = __importDefault(require("./AbstractController"));
class VideogameController extends AbstractController_1.default {
    static get instance() {
        if (!this._instance) {
            this._instance = new VideogameController("videogame");
        }
        return this._instance;
    }
    initRoutes() {
        this.router.post('/create', this.createVideogame);
        this.router.get('/get/:id', this.getVideogame);
    }
    createVideogame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, price, genre } = req.body;
            try {
                const videogame = yield models_1.default.Videogame.create({
                    id,
                    title,
                    price,
                    genre
                });
                res.status(201).json(videogame);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error: ' + error.message);
            }
        });
    }
    getVideogame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const videogame = yield models_1.default.Videogame.findByPk(id);
                if (!videogame) {
                    res.status(404).send('Videogame not found');
                    return;
                }
                res.status(200).json(videogame);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error: ' + error.message);
            }
        });
    }
}
exports.default = VideogameController;
