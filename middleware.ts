// https://vercel.com/docs/concepts/functions/edge-middleware/middleware-api
import { next } from "@vercel/edge";

export default function middleware() {
    try {
        console.log("in middleware");
        const response = next();

        response.headers.set("X-Example-Header", "Hello");
        console.log({ headers: JSON.stringify(response.headers, null, 2) });
        return response;
    } catch (e) {
        console.log(e);
        throw new Error("Unable to set headers");
    }
}
