import { useSelector } from "react-redux";
import { selectUser } from "src/store/features/user/userSlice";
import CreateRoom from "../CreateRoom";
import JoinRoom from "../JoinRoom";

const Hero = () => {
  const user = useSelector(selectUser);

  if (!user?.roomId) {
    return <CreateRoom />;
  }

  return <JoinRoom roomId={user!.roomId} />;
};

export default Hero;
