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
const productNOSQL_1 = __importDefault(require("../modelsNOSQL/productNOSQL"));
const AbstractController_1 = __importDefault(require("./AbstractController"));
class ProductController extends AbstractController_1.default {
    static get instance() {
        if (!this._instance) {
            this._instance = new ProductController("product");
        }
        return this._instance;
    }
    initRoutes() {
        this.router.post('/create', this.createProduct.bind(this));
        this.router.get('/get/:id', this.getProduct.bind(this));
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productNOSQL_1.default.create(req.body);
                res.status(201).json(product);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error: ' + error.message);
            }
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield productNOSQL_1.default.get({ HashKeyID: id });
                if (!product) {
                    res.status(404).send('Product not found');
                    return;
                }
                res.status(200).json(product);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal server error: ' + error.message);
            }
        });
    }
}
exports.default = ProductController;
