"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./provider/Server"));
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const VideogameController_1 = __importDefault(require("./controllers/VideogameController"));
const ProductController_1 = __importDefault(require("./controllers/ProductController"));
const server = new Server_1.default({
    port: config_1.PORT,
    env: config_1.NODE_ENV,
    middlewares: [
        express_1.default.json(),
        express_1.default.urlencoded({ extended: true })
    ],
    controllers: [
        VideogameController_1.default.instance,
        ProductController_1.default.instance
    ]
});
server.init();
