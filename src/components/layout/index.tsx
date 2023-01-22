import { Adsense } from "@ctrl/react-adsense";
import Spinner from "components/Spinner";
import { useAuth } from "hooks/useAuth";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectIsFetchingUser } from "src/store/features/user/userSlice";
import Header from "./Header";

const Layout = () => {
  const isFetchingUser = useSelector(selectIsFetchingUser);

  useAuth();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Adsense
        client={import.meta.env.VITE_APP_ADSENSE_CLIENT_ID}
        slot={import.meta.env.VITE_APP_ADSENSE_SLOT_FOOTER_ID}
      />
      <Spinner isOpen={isFetchingUser} />
    </>
  );
};

export default Layout;
