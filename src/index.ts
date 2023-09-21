
import chalk from 'chalk';
import express from 'express';

import dotenv from 'dotenv';

import path from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { envConfig } from "./config/config";

import { Sequelize } from 'sequelize-typescript'
import { getModels } from "./getModels";

import { authChecker } from "./utils/authChecker";
import { getResolvers } from './getResolvers';

import * as http from 'http';

export let sequelize: Sequelize;

const main = async () => {

    dotenv.config();
    
    sequelize = new Sequelize(envConfig.sequelizeOptions);

    sequelize.addModels(getModels());

    await sequelize.authenticate();

    console.log(chalk.blue('db connection has been established successfully.'));

    const app = express();

    const schema = await buildSchema({
        resolvers: getResolvers(),
        authChecker: authChecker,
        validate: false,
        globalMiddlewares: []
    });

    const apolloServer = new ApolloServer({
        schema
    })

    await apolloServer.listen();

    const httpServer = http.createServer(app);

    await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT }, resolve));

    console.log(chalk.green(`server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`));
}

main().catch(err => {
    console.error('\n' + chalk.red(err) + '\n');
  });