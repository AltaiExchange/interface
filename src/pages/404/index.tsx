import React from "react";
import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Altai | 404</title>
      </Head>
      <div className="flex flex-col gap-10 w-full h-[74vh] items-center justify-center text-center">
        <div className="animate-404 bg-upper-background border border-border">
          <svg
            id="cogs"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 225 184"
            xmlSpace="preserve"
          >
            <path
              id="cog3"
              d="M163.1,48.3c-3.4,0.9-6.7,2.1-9.8,3.4c2.6,12-7.6,15.9-14.8,10.8c-2.8,1.9-4.8,4.6-5.7,8.3
      c7.6,5.1,3.8,18.7-6.5,17.5c0,3.9,0,7.8,0,11.7c11-1.1,13.4,12.5,6.5,18.4c1.9,2.8,2.8,6.7,6.5,7.6c6.5-5.5,16.5-0.5,13.9,10.8
      c3.1,1.2,6.4,2.5,9.8,3.4c1.4-9.5,15.7-9.5,17.2,0c3.4-0.9,6.7-2.1,9.8-3.4c-2.6-12,7.6-15.9,14.8-10.8c2.8-1.9,4.8-4.6,5.7-8.3
      c-7.6-5.1-3.8-18.7,6.5-17.5c0-3.9,0-7.8,0-11.7c-11,0.9-13.4-12.5-6.5-18.4c-1.9-2.8-2.6-6.7-6.5-7.4c-6.5,5.5-16.5,0.5-13.9-10.8
      c-3.1-1.2-6.4-2.5-9.8-3.4C177.9,58.2,165.5,58.2,163.1,48.3z M188.7,94.2c0,9.5-7.6,17.3-17,17.3c-9.5,0-17-7.8-17-17.3
      c0-9.5,7.6-17.3,17-17.3C181.1,76.7,188.7,84.5,188.7,94.2z"
            />
            <path
              id="cog2"
              d="M85.1,7.3c-3.4,0.9-6.7,2.1-9.8,3.4c2.6,12-7.6,15.9-14.8,10.8c-2.8,1.9-4.8,4.6-5.7,8.3
      c7.6,5.1,3.8,18.7-6.5,17.5c0,3.9,0,7.8,0,11.7c11-1.1,13.4,12.5,6.5,18.4c1.9,2.8,2.8,6.7,6.5,7.6c6.5-5.5,16.5-0.5,13.9,10.8
      c3.1,1.2,6.4,2.5,9.8,3.4c1.4-9.5,15.7-9.5,17.2,0c3.4-0.9,6.7-2.1,9.8-3.4c-2.6-12,7.6-15.9,14.8-10.8c2.8-1.9,4.8-4.6,5.7-8.3
      c-7.6-5.1-3.8-18.7,6.5-17.5c0-3.9,0-7.8,0-11.7c-11,0.9-13.4-12.5-6.5-18.4c-1.9-2.8-2.6-6.7-6.5-7.4c-6.5,5.5-16.5,0.5-13.9-10.8
      c-3.1-1.2-6.4-2.5-9.8-3.4C99.9,17.2,87.5,17.2,85.1,7.3z M110.7,53.2c0,9.5-7.6,17.3-17,17.3c-9.5,0-17-7.8-17-17.3
      s7.6-17.3,17-17.3C103.1,35.7,110.7,43.5,110.7,53.2z"
            />
            <path
              id="cog1"
              d="M46.1,86.3c-3.4,0.9-6.7,2.1-9.8,3.4c2.6,12-7.6,15.9-14.8,10.8c-2.8,1.9-4.8,4.6-5.7,8.3
      c7.6,5.1,3.8,18.7-6.5,17.5c0,3.9,0,7.8,0,11.7c11-1.1,13.4,12.5,6.5,18.4c1.9,2.8,2.8,6.7,6.5,7.6c6.5-5.5,16.5-0.5,13.9,10.8
      c3.1,1.2,6.4,2.5,9.8,3.4c1.4-9.5,15.7-9.5,17.2,0c3.4-0.9,6.7-2.1,9.8-3.4c-2.6-12,7.6-15.9,14.8-10.8c2.8-1.9,4.8-4.6,5.7-8.3
      c-7.6-5.1-3.8-18.7,6.5-17.5c0-3.9,0-7.8,0-11.7c-11,0.9-13.4-12.5-6.5-18.4c-1.9-2.8-2.6-6.7-6.5-7.4c-6.5,5.5-16.5,0.5-13.9-10.8
      c-3.1-1.2-6.4-2.5-9.8-3.4C60.9,96.2,48.5,96.2,46.1,86.3z M71.7,132.2c0,9.5-7.6,17.3-17,17.3c-9.5,0-17-7.8-17-17.3
      s7.6-17.3,17-17.3C64.1,114.7,71.7,122.5,71.7,132.2z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-6xl font-semibold">404</h2>
          <p className="text-tiny">not found</p>
        </div>
        <Link href="/" className="border-b-2 border-border">
          Back Home
        </Link>
      </div>
    </>
  );
}
