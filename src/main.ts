import * as elastic from "./elastic";
import server from "./server";
import data from "./data";
import dotenv from "dotenv";
dotenv.config();

(async function main() {
    const isElasticReady = await elastic.checkConnection();

    if (isElasticReady) {
        const elasticIndex = await elastic.esclient.indices.exists({ index: elastic.index });

        if (!elasticIndex) {
            await elastic.createIndex(elastic.index);
            await elastic.setQuotesMapping();
            await data.populateDatabase();
        }

        server.start();
    }
})();
