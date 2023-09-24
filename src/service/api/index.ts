import Fastify from "fastify";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { getAmazonAccessToken } from "../Alexa";

const fastify = Fastify({
    logger: false,
    http2: true,
    https: {
        allowHTTP1: true,
        key: fs.readFileSync(path.join(__dirname, "https", "fastify.key")),
        cert: fs.readFileSync(path.join(__dirname, "https", "fastify.cert")),
    },
});

fastify.get("/oauth", async function handler(request, reply) {
    const routeQuerySchema = z.object({
        code: z.string(),
        scope: z.string(),
    });

    const query = routeQuerySchema.parse(request.query);

    const token = await getAmazonAccessToken(query.code);

    return token;
});

export async function startApiServer() {
    try {
        await fastify.listen({ port: 8080 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
