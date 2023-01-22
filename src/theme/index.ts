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
        overflowX: "hidden",
      },
      "#root": {
        display: "flex",
        flexDirection: "column",
        minHeight: "full",
        height: "100% !important",
      },
      "#root > main": {
        flexGrow: 1,
      },
    },
  },
});

export default theme;
