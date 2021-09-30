import * as core from 'express-serve-static-core'
import * as express from "express"
import AppLogger from './AppLogger'
import {ACCESS_LOG_FORMAT} from './constants'

export function getExpressApp(appName: string) : core.Express {

    const app = express();

    const logger =  AppLogger.init(appName);
    const morgan = require('morgan')

    app.use(morgan(ACCESS_LOG_FORMAT,{"stream" :  {write(message: String) {logger.info("<access>"+message)}}}))
    
    return app
}
