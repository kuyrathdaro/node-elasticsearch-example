import * as elastic from "../elastic";
import quotes from "./quotes.json";

const esAction = {
    index: {
        _index: elastic.index
    }
};

async function populateDatabase() {
    const docs = [];
    for (let quote of quotes) {
        docs.push(esAction);
        docs.push(quote);
    }

    return elastic.esclient.bulk({ operations: docs});
}

export default {
    populateDatabase
}