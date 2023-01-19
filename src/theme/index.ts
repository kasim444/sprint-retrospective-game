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
        display: "grid",
        gridTemplateAreas: '"header" "main" "left-aside" "right-aside"',
        gridTemplateColumns: "1fr",
      },
      header: {
        gridArea: "header",
      },
      main: {
        gridArea: "main",
      },
      aside: {
        "&:first-of-type": {
          gridArea: "left-aside",
        },
        "&:last-of-type": {
          gridArea: "right-aside",
        },
      },
      "@media screen and (min-width: 1200px)": {
        "#root": {
          gridTemplateAreas:
            '"header header header" "left-aside main right-aside"',
          gridTemplateColumns: "336px 1fr 336px",
        },
      },
    },
  },
});

export default theme;
