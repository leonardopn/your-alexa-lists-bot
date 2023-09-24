export function mountOauthUrl() {
    const clientId = process.env.ALEXA_CLIENT_ID;
    const redirectUri = process.env.ALEXA_REDIRECT_URI;
    const basePath = process.env.ALEXA_OAUTH_URL;
    const url = `${basePath}?client_id=${clientId}&scope=alexa::skills:account_linking&response_type=code&redirect_uri=${redirectUri}`;
    return url;
}
