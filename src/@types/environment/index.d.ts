export type DefaultEnvs = {
    NODE_ENV: "development" | "production";
    TELEGRAM_BOT_TOKEN: string;
    ALEXA_CLIENT_ID: string;
    ALEXA_REDIRECT_URI: string;
    ALEXA_OAUTH_URL: string;
    ALEXA_CLIENT_SECRET: string;
    ALEXA_SKILL_ID: string;
};

declare global {
    namespace NodeJS {
        interface ProcessEnv extends DefaultEnvs {}
    }
}

export {};
