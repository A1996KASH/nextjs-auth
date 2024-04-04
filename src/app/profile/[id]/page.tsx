import React from "react";
const ProfilePage = ({params}: any) => {
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  );
};

export default ProfilePage;
