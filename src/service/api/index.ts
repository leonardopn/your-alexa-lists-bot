import Fastify from "fastify";
import fs from "fs";
import path from "path";

const fastify = Fastify({
    logger: true,
    http2: true,
    https: {
        allowHTTP1: true, // fallback support for HTTP1
        key: fs.readFileSync(path.join(__dirname, "https", "fastify.key")),
        cert: fs.readFileSync(path.join(__dirname, "https", "fastify.cert")),
    },
});

fastify.get("/oauth", async function handler(request, reply) {
    console.log(request);
    return { hello: "world" };
});

export async function startApiServer() {
    try {
        await fastify.listen({ port: 8080 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
