import { Center } from "@chakra-ui/react";
import { Adsense } from "@ctrl/react-adsense";
import Spinner from "components/Spinner";
import { useAuth } from "hooks/useAuth";
import { usePageViews } from "hooks/usePageViews";
import useScrollToTop from "hooks/useScrollToTop";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectIsFetchingUser } from "store/features/user/userSlice";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const isFetchingUser = useSelector(selectIsFetchingUser);

  useAuth();
  useScrollToTop();
  usePageViews();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Center my="4">
        <Adsense
          client={import.meta.env.VITE_APP_ADSENSE_CLIENT_ID}
          slot={import.meta.env.VITE_APP_ADSENSE_SLOT_FOOTER_ID}
        />
      </Center>
      <Footer />
      <Spinner isOpen={isFetchingUser} />
    </>
  );
};

export default Layout;
