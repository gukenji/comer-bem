import React from "react";
import { useAppSelector } from "../store/store";
const HomePage = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  console.log(basicUserInfo);
  return (
    <div>
      <p>You're logged in</p>
    </div>
  );
};

export default HomePage;
