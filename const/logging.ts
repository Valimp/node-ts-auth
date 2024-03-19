type LogLevel = "info" | "warn" | "error" | "debug"

const log = (
    level: LogLevel,
    namespace: string,
    message: string,
    object?: any
) => {

    const timeStamp = new Date().toISOString();
    const logMessage = `[${timeStamp}] [${level.toUpperCase()}] [${namespace.toUpperCase()}] ${message}`;

    if (object) {
        console[level](logMessage, object);
    } else {
        console[level](logMessage);
    }

}

const createLogger = (level: LogLevel) => 
    (namespace: string, message: string, object?: any) => {
    log(level, namespace, message, object)
}

export const info = createLogger("info");
export const warn = createLogger("warn");
export const error = createLogger("error");
export const debug = createLogger("debug");
