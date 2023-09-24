import axios, { AxiosError } from "axios";
import { z } from "zod";

export async function getAmazonAccessToken(code: string) {
    try {
        const { data } = await axios.post("https://api.amazon.com/auth/o2/token", null, {
            params: {
                grant_type: "authorization_code",
                code,
                client_id: process.env.ALEXA_CLIENT_ID,
                client_secret: process.env.ALEXA_CLIENT_SECRET,
                redirect_uri: process.env.ALEXA_REDIRECT_URI,
            },
        });

        const responseSchema = z.object({
            access_token: z.string(),
            expires_in: z.number(),
            refresh_token: z.string(),
            token_type: z.string(),
        });

        return responseSchema.parse(data);
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(JSON.stringify(error.response?.data || error.message));
        }
        throw error;
    }
}

export async function enableToUseSkill(accessToken: string, code: string) {
    try {
        const { data } = await axios.post(
            `https://api.amazonalexa.com/v1/users/~current/skills/${process.env.ALEXA_SKILL_ID}/enablement`,
            {
                stage: "development",
                accountLinkRequest: {
                    redirectUri: process.env.ALEXA_REDIRECT_URI,
                    authCode: code,
                    type: "AUTH_CODE",
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(JSON.stringify(error.response?.data || error.message));
        }
        throw error;
    }
}
