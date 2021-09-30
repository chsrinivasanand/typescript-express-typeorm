import * as appCore from './setuplib/AppBuildCore';
import * as config from 'config';
import {appName} from './constants'
import {Request, Response} from 'express'
import Logger from './util/AppLogger'

const app = appCore.getExpressApp(appName)

console.log("process.env.NODE_ENV:",process.env.NODE_ENV)

app.use('/healthcheck',function(req: Request , res: Response){
    res.sendStatus(200);
})

app.listen(config.get('app.port'), async () => {
    Logger.info("Welcome to "+appName)
    Logger.info(appName+" running on port: "+config.get('app.port') )
})

