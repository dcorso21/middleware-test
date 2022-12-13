// https://vercel.com/docs/concepts/functions/edge-middleware/middleware-api
import { next } from "@vercel/edge";

export default async function middleware() {
    console.log('Middleware function')
    return next({
        headers: { "x-from-middleware": "true" },
    });
}
