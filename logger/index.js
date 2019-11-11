import * as path from 'path'
import * as logger from 'perfect-logger';

logger.setLogDirectory(path.join(__dirname, '../', 'logs'));
logger.setLogFileName("log");
logger.setLogFileName("log");
logger.setStatusCodes({
    info: {code: "INFO", writeToDatabase: false, hidden: true},
    warn: {code: "WARN", writeToDatabase: true, hidden: true},
    crit: {code: "CRIT", writeToDatabase: true, hidden: true},
    debug: {code: "DEBG", writeToDatabase: false, hidden: true},
    data: {code: "DATA", writeToDatabase: false, hidden: true}
});
logger.initialize();


export default logger.default
