import "../styles/yoonseo/Mypage.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import PerformerProfile from "../components/com_Performer/PerformerProfile";
import PerformerCancel from "../components/popup_Performer/PerformerCancel";
import SwitchRoles from "../components/common/SwitchRoles";

const Mypage = () => {
  const nav = useNavigate();

  const [cancel, setCancel] = useState(false);
  const [popup, setPopup] = useState(false);
  const [myprofile, setMyprofile] = useState();
  const [latestProfile, setLatestProfile] = useState({});

  useEffect(() => {
    const MypageView = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/performer/mypage/1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("마이프로필", response.data.result);
        setMyprofile(response.data.result);

        setLatestProfile({
          id: response.data.result.profileDTO.id,
          introduction: response.data.result.profileDTO.introduction,
          name: response.data.result.profileDTO.name,
          phoneNumber: response.data.result.profileDTO.phoneNumber,
          profileImages: response.data.result.profileDTO.profileImages,
          team: response.data.result.profileDTO.team,
        });
      } catch (error) {
        console.error("프로필 정보를 불러오는데 실패했습니다:", error);
      }
    };
    MypageView();
  }, []);

  if (!myprofile) {
    return <div>Loading...</div>;
  }

  const fullName = myprofile.name;
  const name = fullName.substring(1);

  return (
    <div className="Mypage">
      <Navbar_Perforemr />
      <div className="Mypage_content">
        <h3>마이페이지</h3>
        <img src={myprofile.profileimage} alt="" className="profile_img" />
        <p className="name">{fullName}</p>
        <p className="latest">
          {name}님의<span>&nbsp;최근&nbsp;</span>프로필이에요
        </p>
        <PerformerProfile
          key={latestProfile.id}
          profile={latestProfile}
          className={"profile-card profile-latest"}
        />

        <div className="choice">
          <button
            onClick={() => {
              nav("/alarm");
            }}
          >
            알림
          </button>
          <button
            onClick={() => {
              nav("/performer_registration");
            }}
          >
            공연자 등록
          </button>
          <button
            onClick={() => {
              nav("/rental_history");
            }}
          >
            대관내역
          </button>
          <button
            onClick={() => {
              nav("/my_activity");
            }}
          >
            내 활동
          </button>
          <button
            onClick={() => {
              setPopup(true);
            }}
          >
            역할 전환
          </button>
          <button>로그아웃</button>
          <button
            onClick={() => {
              setCancel(true);
            }}
          >
            회원탈퇴
          </button>
        </div>
        {cancel && <PerformerCancel onClose={() => setCancel(false)} />}
        {popup && (
          <SwitchRoles
            onClose={() => {
              setPopup(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Mypage;
