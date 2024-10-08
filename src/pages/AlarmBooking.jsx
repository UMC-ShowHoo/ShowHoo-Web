import "../styles/yoonseo/Alarm.css";

import axios from "axios";
import { useEffect, useState } from "react";

import AlarmDelete from "../api/AlarmDelete";

import Navbar_Booking from "../components/common/Navbar_Booking";
import AlarmDetail from "../components/com_Performer/AlarmDetail";

const AlarmBooking = () => {
  const url = "https://showhoo.site";
  const [alarmResult, setAlarmResult] = useState([]);
  const audienceId = sessionStorage.getItem("audienceId");

  useEffect(() => {
    const BookingAlarmCheck = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${url}/notifications/AUDIENCE/${audienceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("알림 데이터", response.data.result);
        setAlarmResult(response.data.result);
      } catch (error) {
        console.error("알림 데이터를 가져오는데 실패했습니다:", error);
      }
    };
    BookingAlarmCheck();
  }, []);

  // 알림 배열을 만들어서 하나씩 넣기

  return (
    <div className="Alarm">
      <Navbar_Booking />
      {console.log(alarmResult)}

      <div className="Alarm_content">
        <h1>알림</h1>
        <div className="Alarm_map">
          {alarmResult.map((notification) => (
            <AlarmDetail
              key={notification.id}
              id={notification.id}
              type={notification.type}
              message={notification.message}
              timestamp={notification.createdAt}
              AlarmDelete={AlarmDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlarmBooking;
