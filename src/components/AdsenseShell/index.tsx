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
          slot={import.meta.env.VITE_APP_ADSENSE_SLOT_ASIDE1_ID}
        />
      </Aside>
      <Section>{children}</Section>
      <Aside>
        <Adsense
          client={import.meta.env.VITE_APP_ADSENSE_CLIENT_ID}
          slot={import.meta.env.VITE_APP_ADSENSE_SLOT_ASIDE2_ID}
        />
      </Aside>
    </Wrapper>
  );
};

export default AdsenseShell;
