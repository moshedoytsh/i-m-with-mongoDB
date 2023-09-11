import { Request, Response } from "express";
import * as services from '../services/products-services.js';
import { handleError } from "../../error-handling/handle-error.js";

export const getAllProducts = async (req: Request, res: Response) => {
    // try & catch
    try {
        const all = await services.getAllProducts();
        res.send(all);
    } catch (error) {
        handleError(res, error);
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const product = await services.getProductById(id);
        res.send(product);
    } catch (error) {
        if (error instanceof Error && error.message === 'Id not exist') {
            res.status(404).send(`product with id "${req.params.id}" not found.`);
            return;
        }
        handleError(res, error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const properties = req.body;
        const product = await services.updateProduct(id, properties);
        res.send(product);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Id not exist') {
                return handleError(res, error, 404, `product with id "${req.params.id}" not found.`);
            }
            if (error.message === 'invalid entry') {
                return handleError(res, error, 404, `The request contain invalid entry.
                The only entries allowed are: 
                title, price, description, category, image, rating, quantity`);
            }
        }
        handleError(res, error);
    }
}

export const updateQuantity = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const n = req.body.n;
        const product = await services.updateQuantity(id, n);
        res.send(product);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Id not exist') {
                return handleError(res, error, 404, `product with id "${req.params.id}" not found.`);
            }
            if (error.message === 'Quantity under zero') {
                return handleError(res, error, 422, 'Quantity cant be under zero')
            }
        }
        handleError(res, error);
    }
}

export const appendProduct = async (req: Request, res: Response) => {
    try {
        const properties = req.body;
        const product = await services.appendProduct(properties);
        res.send(product);
    } catch (error) {
        handleError(res, error);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        await services.deleteProduct(id);
        res.send('product deleted.');
    } catch (error) {
        handleError(res, error);
    }
};