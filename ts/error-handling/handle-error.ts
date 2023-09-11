import { Response } from "express";

export const handleError = (res: Response, err: unknown, statusCode=400, message='Something went wrong') => {
    console.error(err);
    res.status(statusCode).send(message);
};