import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient = new Client({ node: elasticUrl });
const index: string = "quotes";

async function createIndex(index: any) {
    try {
        await esclient.indices.create({ index });
        console.log(`Created index ${index}`);
    } catch (err) {
        console.error(`An error occurred while creating index ${index}:`);
        console.error(err);
    }
}

async function setQuotesMapping() {
    try {
        await esclient.indices.putMapping({
            index,
            body: {
                properties: {
                    quote: { type: "text" },
                    author: { type: "text" }
                }
            }
        });
        console.log("Quotes mapping created successfully");
    } catch (err) {
        console.error("An error occurred while setting the quotes mapping:");
        console.error(err);
    }
}

function checkConnection() {
    return new Promise(async (resolve) => {
        console.log("Checking connection to ElasticSearch...");

        let isConnected = false;
        while (!isConnected) {
            try {
                await esclient.cluster.health();
                console.log("Successfully connected to ElasticSearch");
                isConnected = true;
            } catch (_) { }
        }
    });
}

export {
    esclient,
    setQuotesMapping,
    checkConnection,
    createIndex,
    index
}