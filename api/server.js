import { Readable } from "node:stream";
import app from "../dist/server/server.js";

export default async function handler(incoming, outgoing) {
  try {
    const protocol = incoming.headers["x-forwarded-proto"] || "http";
    const host = incoming.headers.host;
    const origin = `${protocol}://${host}`;

    const init = {
      method: incoming.method,
      headers: new Headers(
        Object.entries(incoming.headers).flatMap(([key, value]) =>
          Array.isArray(value)
            ? value.map((item) => [key, item])
            : value == null
              ? []
              : [[key, value]],
        ),
      ),
    };

    if (incoming.method !== "GET" && incoming.method !== "HEAD") {
      init.body = Readable.toWeb(incoming);
      init.duplex = "half";
    }

    const response = await app.fetch(
      new Request(new URL(incoming.url || "/", origin), init),
      {},
      {},
    );

    outgoing.statusCode = response.status;
    response.headers.forEach((value, key) => outgoing.setHeader(key, value));

    if (!response.body) {
      return outgoing.end();
    }

    Readable.fromWeb(response.body).pipe(outgoing);
  } catch (error) {
    console.error("Vercel Bridge Error:", error);
    if (!outgoing.headersSent) {
      outgoing.writeHead(500, { "content-type": "application/json" });
    }
    outgoing.end(JSON.stringify({ error: { message: "Internal server error.", details: error.message } }));
  }
}
