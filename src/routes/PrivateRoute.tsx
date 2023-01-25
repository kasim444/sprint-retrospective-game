import EnterRoom from "components/sections/EnterRoom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectUser } from "store/features/user/userSlice";

const PrivateRoute = () => {
  const user = useSelector(selectUser);

  return user?.displayName ? <Outlet /> : <EnterRoom />;
};

export default PrivateRoute;
