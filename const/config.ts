import 'dotenv/config';

export const PORT : number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const URL : string = process.env.URL ? process.env.URL : 'http://localhost';
export const MONGODB_URI : string = process.env.MONGODB_URI ? process.env.MONGODB_URI : '';