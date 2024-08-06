import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext } from "../../App";

import Frame21 from "../../assets/img_Performer/Frame21.png";

const Addprofiles = () => {
  const new_profile = {
    date: "새 프로필",
    title: "",
    school: "",
    information: "",
  };
  const profiles = useContext(ProfileContext);
  const nav = useNavigate();

  const profileLength = profiles.length;
  const addLength = 4 - profileLength;
  const addProfiles = Array.from({ length: addLength }, (_, index) => (
    <div
      key={index}
      className={`addProfiles addProfiles${index + 1}`}
      onClick={() => nav("/performer_update", { state: new_profile })}
    >
      <p>프로필을 더 추가하세요</p>
      <img src={Frame21} alt="" />
    </div>
  ));

  return addProfiles;
};

export default Addprofiles;