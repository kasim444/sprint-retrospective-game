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
    <main>
      <Header />
      <Outlet />
      <Spinner isOpen={isFetchingUser} />
    </main>
  );
};

export default Layout;
