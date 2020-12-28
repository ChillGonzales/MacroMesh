import Head from 'next/head';
import React from 'react';

class HeadComponent extends React.Component {
  public render(): JSX.Element {
    return (
      <Head>
        <title>Macronutrient Meal Plan Calculator</title>
        <meta name="description" content="Build a meal plan that fits your daily macronutrient budget using our free online calculator!" />
        <link rel="icon" href="/favicon.ico" />

        {/* Global site tag (gtag.js) - Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N5YWZJW0FF"></script>
        <script dangerouslySetInnerHTML={{
          __html: String.raw`window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-N5YWZJW0FF');`
        }} />

        {/* Crisp chat bot */}
        <script dangerouslySetInnerHTML={{
          __html: String.raw`window.$crisp = []; window.CRISP_WEBSITE_ID = "d8568dc2-773d-4a02-9b80-ec8f00e37863"; (function () { d = document; s = d.createElement("script"); s.src = "https://client.crisp.chat/l.js"; s.async = 1; d.getElementsByTagName("head")[0].appendChild(s); })();`
        }} />

        {/* Required meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Montserrat font */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="style.css" />
      </Head>
    );
  }
}

export default HeadComponent;