// VenueInfo.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VenueDetails.css';
import star from "../../assets/images/venueregisterpage_introduce/scoreStar.svg";

const VenueInfo = ({ data, spaceId }) => {
  const [headerData, setHeaderData] = useState(null);

  useEffect(() => {
    const fetchVenueHeader = async () => {
      try {
        const response = await axios.get(`https://showhoo.site/spaces/${spaceId}/header`);
        if (response.data.isSuccess) {
          setHeaderData(response.data.result);
        }
      } catch (error) {
        console.error("Failed to fetch venue header information:", error);
      }
    };

    fetchVenueHeader();
  }, [spaceId]);

  if (!headerData || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="venue-info">
      <h1>{data.name}</h1>
      <div className="venue-rating">
        <span className="rating">
          <img src={star} alt="Star" className="star-icon" /> 
          <span style={{ marginLeft: '3px' }}>
            {headerData.averageGrade ? headerData.averageGrade.toFixed(1) : "0.0"} {/* API에서 가져온 평점 */}
          </span>
        </span>
        <span className="reviews">(후기 {headerData.reviewCount || 0}개)</span> {/* API에서 가져온 리뷰 수 */}
        <span className="address">{headerData.location}</span> {/* API에서 가져온 주소 */}
      </div>
    </div>
  );
};

export default VenueInfo;
