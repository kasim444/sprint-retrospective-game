import { Box, Center } from "@chakra-ui/react";
import { Adsense } from "@ctrl/react-adsense";
import Spinner from "components/Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "hooks/useAuth";
import { usePageViews } from "hooks/usePageViews";
import useScrollToTop from "hooks/useScrollToTop";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { selectIsFetchingUser } from "store/features/user/userSlice";
import { layoutAnim } from "utils/motionAnimations";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const isFetchingUser = useSelector(selectIsFetchingUser);
  const location = useLocation();

  useAuth();
  useScrollToTop();
  usePageViews();

  return (
    <>
      <Header />
      <AnimatePresence key={location.pathname} exitBeforeEnter>
        <Box
          as={motion.main}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={layoutAnim.layoutVariants}
        >
          <Outlet />
        </Box>
      </AnimatePresence>
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
