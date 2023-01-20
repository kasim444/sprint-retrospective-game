import { Adsense } from "@ctrl/react-adsense";
import { FC, ReactNode } from "react";
import { Wrapper, Aside, Section } from "./styled";

interface IAdsenseShell {
  children: ReactNode;
}

const AdsenseShell: FC<IAdsenseShell> = ({ children }) => {
  return (
    <Wrapper>
      <Aside>
        <Adsense
          client={import.meta.env.VITE_APP_ADSENSE_CLIENT_ID}
          slot={import.meta.env.VITE_APP_ADSENSE_SLOT1_ID}
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        />
      </Aside>
      <Section>{children}</Section>
      <Aside>
        <Adsense
          client={import.meta.env.VITE_APP_ADSENSE_CLIENT_ID}
          slot={import.meta.env.VITE_APP_ADSENSE_SLOT2_ID}
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        />
      </Aside>
    </Wrapper>
  );
};

export default AdsenseShell;
