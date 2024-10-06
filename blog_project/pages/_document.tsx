import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* Adding React Portal. Check Notes both React and Next JS. Not a Next JS feature. rather a React JS Feature. Can be a good feauture for 
  testing due to accessibility. */}
        <div id="notifications"></div>
      </body>
    </Html>
  );
}
