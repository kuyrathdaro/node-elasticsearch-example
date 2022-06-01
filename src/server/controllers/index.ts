import model from "../models";
import { Request, Response } from 'express';

async function getQuotes(req: Request, res: Response) {
    const query = req.query;
    if (!query.text) {
        res.status(422).json({
            error: true,
            data: "Missing required parameter: text"
        });
        return;
    }
    try {
        const result = await model.getQuotes(req.query);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: "Unknown error." });
    }
}

async function addQuote(req: Request, res: Response) {
    const body = req.body;
    if (!body.quote || !body.author) {
        res.status(422).json({
            error: true,
            data: "Missing required parameter(s): 'quote' or 'author'"
        });
    }
    try {
        const result = await model.insertNewQuote(body.quote, body.author);
        res.json({
            success: true,
            data: {
                id: result._id,
                author: body.author,
                quote: body.quote
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: "Unknown error." });
    }
}

export default {
    getQuotes,
    addQuote
}