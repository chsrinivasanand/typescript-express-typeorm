import * as appCore from './setuplib/AppBuildCore';
import * as config from 'config';
import {appName} from './constants'
import {Request, Response} from 'express'

const app = appCore.getExpressApp(appName)

app.use('/healthcheck',function(req: Request , res: Response){
    res.sendStatus(200);
})

app.listen(config.get('app.port'), async () => {
    console.log("Welcome to "+appName+"\n")
    console.log(appName+" running on port: "+config.get('app.port') )
})

