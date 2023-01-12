import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "src/services/firebase";
import {
  logout,
  setIsFetchingUser,
  updateUser,
  UserState,
} from "src/store/features/user/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  // check at page load if a user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setTimeout(() => {
        dispatch(setIsFetchingUser(false));
      }, 1000);

      if (user) {
        onValue(ref(db, `/users/` + user.uid), (snapshot) => {
          const userData: UserState = {
            uId: user.uid,
            displayName: user.displayName || "",
            roomId: "",
          };
          const currentUser = snapshot?.val();
          if (currentUser) {
            userData.displayName = currentUser?.displayName || "";
            userData.roomId = currentUser?.roomId || "";
          }
          // user is logged in, send the user's details to redux, store the current user in the state
          dispatch(updateUser(userData));
        });
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, []);
};
