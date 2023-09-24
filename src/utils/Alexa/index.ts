export function mountOauthUrl() {
    const clientId = process.env.ALEXA_CLIENT_ID;
    const redirectUri = process.env.ALEXA_REDIRECT_URI;
    const basePath = process.env.ALEXA_OAUTH_URL;
    const scopes = "alexa::skills:account_linking";

    return `${basePath}?scope=${encodeURIComponent(
        scopes
    )}&client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
}
