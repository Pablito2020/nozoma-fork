/* eslint-disable @typescript-eslint/ban-ts-comment */

import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context} from "aws-lambda";
import middy from "@middy/core";
import httpCors from "@middy/http-cors";

import {DEFINITIONS, register as sharedRegister} from "../shared/dependencies.di";
import {ContainerBuilder} from "node-dependency-injection";
import {Logger} from "@shared/domain/Logger";
import AlreadyExists from "@shared/domain/AlreadyExists";
import * as console from "console";
import CommerceGetterHandler from "@backoffice-contexts/commerces/app/get/CommerceGetterHandler";
import {GETTER_DEFINITIONS, register as getRegister} from "./dependencies.di";
import GetCommerceQuery from "@backoffice-contexts/commerces/app/get/GetCommerceQuery";

const container = new ContainerBuilder();
sharedRegister(container);
getRegister(container);
// eslint-disable-next-line one-var
const logger: Logger = container.get(
    DEFINITIONS.Logger
),
    handlerGetter: CommerceGetterHandler = container.get(
        GETTER_DEFINITIONS.Handler
    ),
    execute: APIGatewayProxyHandler = async (
        event: APIGatewayProxyEvent,
        _context: Context
    ) => {
        logger.info(`REQUEST PATH: ${event.path}`);
        logger.info(`REQUEST BODY: ${event.body}`);
        try {
            const {
                    id
                } = JSON.parse(event.body as string),
                getCommerceQuery = new GetCommerceQuery(id),
                commerce = await handlerGetter.handle(getCommerceQuery);
            return {
                statusCode: 200,
                body: JSON.stringify(commerce.data.toPrimitives())
            };
        } catch (e) {
            console.info(e);
            if (e instanceof AlreadyExists) {
                return {
                    statusCode: 400,
                    body: e.message
                };
            } else {
                return {
                    statusCode: 500,
                    body: "Internal server error"
                };
            }
        }

    };

// eslint-disable-next-line one-var
export const handler = middy(execute)
    .use(httpCors());
