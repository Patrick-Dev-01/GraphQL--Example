import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';
import { MovieResolver } from './resolvers/MovieResolver';

(async () => {
    const app = express();

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloWorldResolver, MovieResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: true })

    app.listen(4000, () => {
        console.log('Server Started on port 4000');
    });
})()