import path from 'path';
import { PORT, URL } from './const/config';

export const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth API',
            version: '1.0.0',
            description: 'Auth API Information Documentation',
        },
        servers: [
            {
                url: `${URL}:${PORT}`,
                description: 'Development server',
            }
        ],
    },
    apis: [path.resolve(__dirname, './controllers/*.ts')]
};