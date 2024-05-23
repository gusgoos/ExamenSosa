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
//const express = require('express'); //JS
const express_1 = __importDefault(require("express")); //TS
const models_1 = __importDefault(require("../models"));
class Server {
    //Metodos de instancia
    constructor(appInit) {
        this.app = (0, express_1.default)();
        this.port = appInit.port;
        this.env = appInit.env;
        this.loadmiddlewares(appInit.middlewares);
        this.loadRoutes(appInit.controllers);
        this.connectDB();
    }
    loadRoutes(controllers) {
        this.app.get("/", (req, res) => {
            res.status(200).send("Hello world");
        });
        controllers.forEach((controller) => {
            this.app.use(`/${controller.prefix}`, controller.router);
        });
    }
    loadmiddlewares(middlewares) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.default.sequelize.sync({ force: false });
        });
    }
    init() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.default = Server;
