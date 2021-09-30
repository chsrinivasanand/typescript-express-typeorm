import * as winston from 'winston'
import * as config  from 'config'
const DailyRotateFile = require('winston-daily-rotate-file')

var appLogger:any = null


function init (appName: string) {
    if (appLogger == null) {
        appLogger = getLoggerWithAppname(appName)
    } 
    return appLogger;
}

function getLogger () {
    if (appLogger == null) {
        throw new Error("Please init the logger with appName")
    }
    return appLogger
}

function getLoggerWithAppname (appName: string) {
    const logger =  winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:s:SSS'
            }),
            winston.format.simple(),
            winston.format.printf(data => {
                return `<<${data.timestamp}><${data.logLevel ? data.logLevel : data.level}><${data.message}>>`
            })),
        levels: winston.config.syslog.levels,
        transports: [
           new DailyRotateFile({
               filename: config.get('log.filePath')+appName+"_INFO_"+"%DATE%.log",
               datePattern: 'YYYY-MM-DD',
               maxsize: '2048m',
               level:'info',
               zippedArchive: true
           }),
           new DailyRotateFile({
                filename: config.get('log.filePath')+appName+"_DEBUG_"+"%DATE%.log",
                datePattern: 'YYYY-MM-DD',
                maxsize: '2048m',
                level:'debug',
                zippedArchive: true
            }),
            new DailyRotateFile({
                filename: config.get('log.filePath')+appName+"_ERROR_"+"%DATE%.log",
                datePattern: 'YYYY-MM-DD',
                maxsize: '2048m',
                level:'error',
                zippedArchive: true
            }),
            new DailyRotateFile({
                filename: config.get('log.filePath')+appName+"_COMBINED_"+"%DATE%.log",
                datePattern: 'YYYY-MM-DD',
                maxsize: '2048m',
                zippedArchive: true
            })
        ],
        exitOnError: false
    })

    if (process.env.NODE_ENV !== "Production") {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }))
    }

    return {
        info: function(logMsg: string) {
            logger.info(logMsg)
        },
        debug: function(logMsg: string, error: any) {
            logger.debug(logMsg, error)
        },
        error: function(logMsg, error: any) {
            logger.error(logMsg, error )
        }
    }

}

export default {init,getLogger}