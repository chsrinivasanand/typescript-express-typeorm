import * as core from 'express-serve-static-core'
import * as express from "express"

export function getExpressApp(appName: string) : core.Express {

    const app = express();

    return app
}
