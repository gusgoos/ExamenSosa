"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoService_1 = __importDefault(require("../services/dynamoService"));
const joi_1 = __importDefault(require("joi"));
const config_1 = require("../config");
const ProductModel = dynamoService_1.default.define('product', {
    hashKey: 'HashKeyID', // Assuming 'HashKeyID' is the hash key
    timestamps: false,
    schema: {
        HashKeyID: dynamoService_1.default.types.uuid(), // Assuming 'HashKeyID' is of type UUID
        ProductName: joi_1.default.string(),
        Price: joi_1.default.number(),
        Category: joi_1.default.string()
    },
    tableName: `Products${config_1.PREFIX_NAME}`
});
dynamoService_1.default.createTables((err) => {
    if (err)
        return console.log(err);
    console.log('Tabla creada exitosamente');
});
exports.default = ProductModel;
