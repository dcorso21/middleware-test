// https://vercel.com/docs/concepts/functions/edge-middleware/middleware-api
import { next } from "@vercel/edge";

export default async function middleware() {
    try {
        return next({
            headers: { "x-from-middleware": "true" },
        });
    } catch (e) {
        console.log(e);
        throw new Error("Unable to set headers");
    }
}
