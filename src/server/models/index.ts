import { esclient, index } from "../../elastic";

async function getQuotes(req: any) {
    const { hits } = await esclient.search({
        from: req.page || 0,
        size: req.limit || 100,
        index: index,
        query: {
            match: {
                quote: {
                    query: req.text,
                    operator: "and",
                    fuzziness: "auto"
                }
            }
        }
    });
    const results = hits.total;
    const values = hits.hits.map((hit: any) => {
        return {
            id: hit._id,
            quote: hit._source.quote,
            author: hit._source.author,
            score: hit._score
        }
    });

    return {
        results,
        values
    }
}

async function insertNewQuote(quote: string, author: string) {
    return esclient.index({
        index,
        document: {
            quote,
            author
        }
    });
}

export default {
    getQuotes,
    insertNewQuote
}