import dotenv from 'dotenv';

interface ApiConfig {
    port: string | number;
}

function initConfig(): ApiConfig {
    dotenv.config();

    return {
        port: process.env.PORT || 3000
    };
}

export const config = initConfig();
