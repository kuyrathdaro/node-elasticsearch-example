import { Client } from "@elastic/elasticsearch";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const elasticUsername = process.env.ELASTIC_USERNAME || "elastic";
const elasticPassword = process.env.ELASTIC_PASSWORD as string;
const elasticCertPath = process.env.ELASTIC_CERT_PATH as string;
const esclient = new Client({
    node: elasticUrl,
    auth: {
        username: elasticUsername,
        password: elasticPassword
    },
    tls: {
        ca: fs.readFileSync(elasticCertPath),
        rejectUnauthorized: false
    }
});
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
        resolve(true);
    });
}

export {
    esclient,
    setQuotesMapping,
    checkConnection,
    createIndex,
    index
}