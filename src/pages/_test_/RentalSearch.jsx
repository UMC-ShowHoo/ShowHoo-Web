import "../../styles/Jisu/rentalSearch.css";
import { useLocation } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import RentalSearchBar_2 from "../../components/rental/RentalSearchBar_2.jsx";
import RentalSearchFilter from "../../components/rental/RentalSearchFilter.jsx";
import HotConcertHall from "../../components/_test_/Booking/HotConcertHall.jsx";
import SearchMap from "../../components/rental/SearchMap.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

// 검색 결과창
const RentalSearch = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hallsPerPage = 12; // 한 페이지에 표시할 콘서트홀 개수
  const [concertHalls, setConcertHalls] = useState([]); // 콘서트홀 데이터 저장할 상태

  // 필터 상태 관리 (슬라이더는 고정된 범위를 유지)
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000000);
  const [selectedMinPrice, setSelectedMinPrice] = useState(minPrice); // 실제 API에 반영될 값
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(maxPrice); // 실제 API에 반영될 값

  const [minCapacity, setMinCapacity] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(3000);
  const [selectedMinCapacity, setSelectedMinCapacity] = useState(minCapacity); // 실제 API에 반영될 값
  const [selectedMaxCapacity, setSelectedMaxCapacity] = useState(maxCapacity); // 실제 API에 반영될 값

  const searchValues = location.state || {};
  console.log("전달된 검색 조건 :", searchValues);

  const fetchConcertHalls = async (filters = {}) => {
    const baseUrl = "https://showhoo.site/spaces/search";
    
    try {
      const params = {
        ...filters,
        size: 100, // 일단 임시로 큰 값을 넣었습니다.
      };

      // 조건이 있을 때만 파라미터에 추가
      if (searchValues.searchName) params.name = searchValues.searchName;
      if (searchValues.selectedLocation?.Do) params.city = searchValues.selectedLocation.Do;
      if (searchValues.selectedLocation?.District) params.district = searchValues.selectedLocation.District;
      if (searchValues.selectedDate) params.date = searchValues.selectedDate;
      if (searchValues.mappedType) params.type = searchValues.mappedType;

      const response = await axios.get(baseUrl, { params });

      setConcertHalls(response.data.result.spaceList || []);
      console.log("[검색] 검색된 결과: ", response.data.result.spaceList);
    } catch (error) {
      console.error("[검색] API 호출 오류:", error);
    }
  };

  useEffect(() => {
    fetchConcertHalls({ 
      minPrice: selectedMinPrice, 
      maxPrice: selectedMaxPrice, 
      minCapacity: selectedMinCapacity, 
      maxCapacity: selectedMaxCapacity 
    });
  }, [searchValues, selectedMinPrice, selectedMaxPrice, selectedMinCapacity, selectedMaxCapacity]);

  const totalPages = Math.ceil(concertHalls.length / hallsPerPage);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const indexOfLastHall = currentPage * hallsPerPage;
  const indexOfFirstHall = indexOfLastHall - hallsPerPage;
  const currentHalls = concertHalls.slice(indexOfFirstHall, indexOfLastHall);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="RentalSearch">
      <Navbar_Perforemr />
      <Footer />
      <div className="RentalSearchContent">
        <div className="BarAndFilter">
          <RentalSearchBar_2 />
          <RentalSearchFilter 
            minPrice={minPrice}
            maxPrice={maxPrice}
            selectedMinPrice={selectedMinPrice}
            selectedMaxPrice={selectedMaxPrice}
            minCapacity={minCapacity}
            maxCapacity={maxCapacity}
            selectedMinCapacity={selectedMinCapacity}
            selectedMaxCapacity={selectedMaxCapacity}
            onPriceChange={(min, max) => {
              setSelectedMinPrice(min);
              setSelectedMaxPrice(max);
            }}
            onCapacityChange={(min, max) => {
              setSelectedMinCapacity(min);
              setSelectedMaxCapacity(max);
            }}
          />
        </div>

        <div className="ConcertHallAndMap">
          <div
            className="ConcertHallAndMapBody"
            style={{ display: isCollapsed ? "none" : "block" }}
          >
            <div className="FindText">
              검색된 콘서트홀 {concertHalls.length}개 발견
            </div>
            <div className="ConcertHalls">
              {currentHalls.map((hall) => (
                <HotConcertHall className="ConcertHallCss" key={hall.spaceId} hall={hall}/>
              ))}
            </div>
            <div className="Pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={i + 1 === currentPage ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="Map">
            <SearchMap isCollapsed={isCollapsed} />
          </div>
        </div>

        {/* 버튼에 collapsed 클래스 추가 */}
        <button  
          onClick={toggleCollapse} 
          className={`toggleButton ${isCollapsed ? "collapsed" : ""}`}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>
    </div>
  );
};

export default RentalSearch;
