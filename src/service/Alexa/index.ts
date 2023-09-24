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
