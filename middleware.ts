// https://vercel.com/docs/concepts/functions/edge-middleware/middleware-api
// import { NextResponse } from 'next/server'
import { next } from "@vercel/edge";

// const {
//   REACT_APP_AMPLITUDE_API_ENDPOINT,
//   NODE_ENV,
//   REACT_APP_FPJS_CDN_URL,
//   REACT_APP_WEBSITE_URL,
//   REACT_APP_API_URL,
//   REACT_APP_FPJS_TLS_ENDPOINT,
//   REACT_APP_FPJS_ENDPOINT,
//   REACT_APP_BOTD_ENDPOINT,
// } = process.env

// const WEBSITE_URL = REACT_APP_WEBSITE_URL?.replace('https://', '')

export default function middleware() {
    // have to be set in .env, .env.local will not work.
    // const necessaryVars = [
    //   'REACT_APP_AMPLITUDE_API_ENDPOINT',
    //   'REACT_APP_FPJS_ENDPOINT',
    //   'REACT_APP_FPJS_CDN_URL',
    //   'REACT_APP_WEBSITE_URL',
    //   'REACT_APP_API_URL',
    //   'REACT_APP_FPJS_TLS_ENDPOINT',
    //   'REACT_APP_FPJS_ENDPOINT',
    //   'REACT_APP_BOTD_ENDPOINT',
    // ]

    // const missingEnvVariables = necessaryVars.filter((variable) => !process.env[variable])
    // if (missingEnvVariables.length !== 0) {
    //   throw new Error(
    //     `CSP could not be configured because necessary environment variables were not set. Missing variables: ${JSON.stringify(
    //       missingEnvVariables,
    //       null,
    //       2
    //     )}`
    //   )
    // }
    try {
        console.log("in middleware");

        const response = next();

        response.headers.set("X-Set-Ex", "DENY");
        // response.headers.set('X-Frame-Options', 'DENY')
        // response.headers.set('X-Content-Type-Options', 'nosniff')
        // response.headers.set('X-XSS-Protection', '1; mode=block')
        // response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

        // const cspHeaderName = NODE_ENV === 'production' ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only'
        // response.headers.set(cspHeaderName, NODE_ENV === 'production' ? compiledCsp : 'default-src self;')
        return response;
    } catch (e) {
        console.log(e);
        throw new Error("Unable to set headers");
    }
}

// const csp = [
//   ['default-src', "'self'"],
//   [
//     'script-src',
//     "'report-sample'",
//     "'self'",
//     "'unsafe-inline'",
//     "'sha256-DrRB93mB/cfs/2T2D7/ofNjKcE43PQyH3iS+tMd6tRo='",
//     "'sha256-Uz0yn00PqpvyPuK+MptaAirzRCPwuCU4Vhj/iAbfJxk='",
//     "'sha256-cveTYmMF4Qjo/PsaU4HqenqlgU4hSXQEa8iFe7Hqzto='",
//     "'sha256-Y6TTy+oq+eoACgVQY8L0Y3hlwOnb+ZO7qYMil7qCqak='",
//     "'sha256-BlU3vSjtWCRb01JYtwFVwEn79C0VxILDgBS63iIXwM8='",
//     "'sha256-6nixeeU2hi3MrSIjmGOq9yke14lrSwQbK5WkcJtIyU8='",
//     "'sha256-xI1BcEci8jncUxYekf4P+TCNf5sIZW5qGF7D7oVMN1E='",
//     "'sha256-aE3j+jtuThqq14p9ST0Faq0ALe0Na/uK7ygMihvlADg='",
//     'https://analytics.twitter.com',
//     'https://tagmanager.google.com',
//     'https://connect.facebook.net',
//     'https://js.stripe.com',
//     'https://platform.twitter.com',
//     'https://snap.licdn.com',
//     'https://static.ads-twitter.com',
//     'https://www.google-analytics.com',
//     'https://www.google.com',
//     'https://www.googleadservices.com',
//     'https://www.googleoptimize.com',
//     'https://www.googletagmanager.com',
//     REACT_APP_FPJS_CDN_URL,
//     `*.${WEBSITE_URL}`,
//     'https://*.adroll.com',
//     'https://us-u.openx.net',
//     'https://idsync.rlcdn.com',
//     'https://ib.adnxs.com',
//     'https://x.bidswitch.net',
//     'https://ads.yahoo.com',
//     'https://eb2.3lift.com',
//     'https://trc.taboola.com',
//     'https://simage2.pubmatic.com',
//     'https://sync.outbrain.com',
//     'https://pixel.rubiconproject.com',
//     'https://dsum-sec.casalemedia.com',
//     'https://pixel.advertising.com',
//     'https://googleads.g.doubleclick.net',
//     'https://*.hubspot.com',
//     'https://js.hscollectedforms.net',
//     'https://js.hsadspixel.net',
//     'https://*.hs-scripts.com',
//     'https://js.hs-banner.com',
//     'https://js.hs-analytics.net',
//     'https://forms.hsforms.com',
//     'https://*.usemessages.com',
//   ],
//   ['style-src', "'report-sample'", "'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
//   ['object-src', "'none'"],
//   ['base-uri', "'self'"],
//   [
//     'connect-src',
//     "'self'",
//     `*.dashboard.${WEBSITE_URL}`,
//     `*.${WEBSITE_URL}`,
//     REACT_APP_API_URL,
//     REACT_APP_FPJS_TLS_ENDPOINT,
//     REACT_APP_FPJS_ENDPOINT,
//     REACT_APP_BOTD_ENDPOINT,
//     REACT_APP_AMPLITUDE_API_ENDPOINT,
//     'https://api.rollbar.com',
//     'https://www.google-analytics.com',
//     'https://api.stripe.com',
//     'https://*.hubspot.com',
//     'https://*.hubapi.com',
//   ],
//   ['font-src', "'self'", 'https://fonts.gstatic.com'],
//   ['frame-src', "'self'", 'https://js.stripe.com', 'https://*.hubspot.com'],
//   [
//     'img-src',
//     "'self'",
//     'data:',
//     'https://googleads.g.doubleclick.net',
//     'https://ssl.gstatic.com',
//     'https://www.gstatic.com',
//     'https://px.ads.linkedin.com',
//     'https://www.linkedin.com/',
//     'https://p.adsymptotic.com',
//     'https://www.facebook.com',
//     'https://www.google-analytics.com',
//     'https://www.googleadservices.com/',
//     'https://t.co',
//     'https://www.google.com',
//     'https://www.googletagmanager.com',
//     'https://*.adroll.com',
//     'https://us-u.openx.net',
//     'https://idsync.rlcdn.com',
//     'https://ib.adnxs.com',
//     'https://x.bidswitch.net',
//     'https://ads.yahoo.com',
//     'https://eb2.3lift.com',
//     'https://trc.taboola.com',
//     'https://simage2.pubmatic.com',
//     'https://sync.outbrain.com',
//     'https://pixel.rubiconproject.com',
//     'https://dsum-sec.casalemedia.com',
//     'https://pixel.advertising.com',
//     'http://us-u.openx.net',
//     'http://idsync.rlcdn.com',
//     'http://ib.adnxs.com',
//     'http://x.bidswitch.net',
//     'http://ads.yahoo.com',
//     'http://eb2.3lift.com',
//     'http://trc.taboola.com',
//     'http://simage2.pubmatic.com',
//     'http://sync.outbrain.com',
//     'http://pixel.rubiconproject.com',
//     'http://dsum-sec.casalemedia.com',
//     'http://pixel.advertising.com',
//     'https://*.hsforms.com',
//     'https://*.hubspot.com',
//   ],
//   ['manifest-src', "'self'"],
//   ['media-src', "'self'"],
//   ['report-uri', `${REACT_APP_API_URL}/_/csp-reports`],
//   ['worker-src', "'none'"],
//   ['frame-ancestors', "'none'"],
//   ['upgrade-insecure-requests'],
//   ['form-action', "'none'"],
// ]

// const compiledCsp =
//   csp.reduce((cspString, section) => {
//     cspString += '; ' + section.join(' ')
//     return cspString
//   }, '') + ';'
