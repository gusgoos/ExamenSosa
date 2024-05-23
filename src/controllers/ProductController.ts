import { Request, Response } from "express";
import ProductModel from "../modelsNOSQL/productNOSQL";
import AbstractController from "./AbstractController";

class ProductController extends AbstractController{
    private static _instance: ProductController;

    public static get instance(): ProductController {
        if (!this._instance) {
            this._instance = new ProductController("product");
        }
        return this._instance;
    }

    protected initRoutes(): void {
        this.router.post('/create', this.createProduct.bind(this));
        this.router.get('/get/:id', this.getProduct.bind(this));
    }

    private async createProduct(req: Request, res: Response) {
        try {
            const product = await ProductModel.create(req.body);
            res.status(201).json(product);
        } catch (error: any) {
            console.error(error);
            res.status(500).send('Internal server error: ' + error.message);
        }
    }

    private async getProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await ProductModel.get({ HashKeyID: id });
            if (!product) {
                res.status(404).send('Product not found');
                return;
            }
            res.status(200).json(product);
        } catch (error: any) {
            console.error(error);
            res.status(500).send('Internal server error: ' + error.message);
        }
    }
}

export default ProductController;