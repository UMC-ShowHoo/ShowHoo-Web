import "../styles/yoonseo/RentalHistory.css";

import { useState, useEffect } from "react";
import axios from "axios";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import Footer from "../components/common/Footer";
import Concerthall from "../components/com_Performer/Concerthall";

const RentalHistory = () => {
  const url = "https://showhoo.site";
  const [rental, setRental] = useState([]);
  const performerId = sessionStorage.getItem("performerId");

  useEffect(() => {
    // 매번 페이지를 들어올 때마다 새로고침을 수행
    const hasRefreshed = localStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      localStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    } else {
      localStorage.removeItem("hasRefreshed");
    }
  }, []);

  useEffect(() => {
    const SpaceRental = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${url}/spaces/spaceApply/${performerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("대관 내역 불러오기", response.data.result);

        const updatedRentals = response.data.result.map((rental) => {
          const currentDate = new Date();
          const rentalDate = new Date(rental.date);

          //  지난 공연이면 state = -2
          if (rentalDate < currentDate) {
            return { ...rental, status: -2 };
          } else {
            return rental;
          }
        });

        setRental(updatedRentals);
      } catch (error) {
        console.log("대관 내역 불러오기 실패", error);
      }
    };
    SpaceRental();
  }, []);

  return (
    <div className="RentalHistory">
      <Navbar_Perforemr />
      <Footer />
      <div className="RentalHistory_content">
        <h1>대관 내역</h1>
        {rental.length > 0
          ? rental.map((venue, index) => (
              <Concerthall
                key={index}
                venue={venue}
                className={`venue-card venue-${index + 1}`}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default RentalHistory;
