
import http from "http";
import express from "express";
import { initialize } from "@oas-tools/core";
import { bearerJwt } from "@oas-tools/auth/handlers";
import fs from 'fs';

const serverPort = 8080;
const app = express();
app.use(express.json({limit: '50mb'}));

var cert = fs.readFileSync('public.pem');

const config = {}

/*
const config = {middleware: {
        security: {
            auth: {
                bearerAuth: bearerJwt({issuer: 'http://localhost:9090/realms/master', secret: cert, algorithms: ['RS256']})
            }
        }
    }
}
*/


initialize(app, config).then(() => {
    http.createServer(app).listen(serverPort, () => {
    console.log("\nApp running at http://localhost:" + serverPort);
    console.log("________________________________________________________________");
    if (!config?.middleware?.swagger?.disable) {
        console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
        console.log("________________________________________________________________");
    }
    });
});
