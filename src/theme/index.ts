import { extendTheme } from "@chakra-ui/react";

import "@fontsource/oswald";

const theme = extendTheme({
  fonts: {
    heading: `'Oswald', sans-serif`,
    body: `'Oswald', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "body",
        height: "full",
      },
      body: {
        minHeight: "full",
      },
    },
  },
});

export default theme;
