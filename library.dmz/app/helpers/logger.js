const winston = require('winston');
const expressWinston = require('express-winston');
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
require('winston-daily-rotate-file');

const config = require('../configs/config').logger;

const option = () => {
    return {
        level: config.level,
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            }),
            new winston.transports.DailyRotateFile({
                filename: config.path,
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: config.maxSize,
                maxFiles: config.maxKeep
            })
        ],
        exitOnError: false
    };
}

const logger = () => {
    return expressWinston.logger(option());
}

const errorLogger = () => {
    return expressWinston.errorLogger(option());
}

module.exports = {logger, errorLogger};