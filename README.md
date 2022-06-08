# node-elasticsearch-example

Node Typescript with Elasticsearch Example

## Running with docker

```
Please change .env.example to .env
$ docker-compose up
```

## Request Example

```
# search for quote
$ curl http://localhost:3000/quotes?text=love&limit=3&page=1

# add new quote
$ curl --request POST \
     --url http://localhost:3000/quotes/new \
     --header 'content-type: application/json' \
     --data '{
        "author": "Michele Riva",
        "quote": "Using Docker and ElasticSearch is challenging, but totally worth it."
}'
```