import dotenv from 'dotenv';
dotenv.config();

import Client from './structures/client';

const client = new Client();
client.init();
