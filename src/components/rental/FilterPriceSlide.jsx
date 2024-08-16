import React, { useState, useEffect } from 'react';
import '../../styles/Jisu/FilterPriceSlide.css';

const FilterPriceSlide = ({ minPrice = 0, fixedMaxPrice = 3000000, priceGap = 100000 }) => {
  const [minValue, setMinValue] = useState(minPrice); // 최솟값 저장
  const [maxValue, setMaxValue] = useState(fixedMaxPrice); // 최댓값 저장
  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);

  // 퍼센트 값을 업데이트하는 함수
  const updatePercentages = () => {
    setMinPercent(((minValue - minPrice) / (fixedMaxPrice - minPrice)) * 100);
    setMaxPercent(100 - (((maxValue - minPrice) / (fixedMaxPrice - minPrice)) * 100));
  };

  // 슬라이더 값이 변경될 때 호출되는 핸들러
  const handleMinValueChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    // 새로운 최소값이 최대값과 겹치지 않도록 조정
    if (newValue > maxValue - priceGap) {
      setMaxValue(newValue + priceGap);
    }
    setMinValue(newValue);
  };

  const handleMaxValueChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    // 새로운 최대값이 최소값과 겹치지 않도록 조정
    if (newValue < minValue + priceGap) {
      setMinValue(newValue - priceGap);
    }
    setMaxValue(newValue);
  };

  // 값이 변경된 후 퍼센트 업데이트
  useEffect(() => {
    updatePercentages();
  }, [minValue, maxValue]);

  return (
    <div className="FilterPriceSlide">
      <div
        className="FilterPriceSlideInner"
        style={{
          left: `${minPercent}%`,
          right: `${maxPercent}%`,
        }}
      />
      <div className="FilterPriceRangeWrap">
        <input
          className="FilterPriceRangeMin"
          type="range"
          min={minPrice}
          max={fixedMaxPrice - priceGap}
          step={priceGap}
          value={minValue}
          onChange={handleMinValueChange}
        />
        <input
          className="FilterPriceRangeMax"
          type="range"
          min={minPrice + priceGap}
          max={fixedMaxPrice}
          step={priceGap}
          value={maxValue}
          onChange={handleMaxValueChange}
        />
      </div>
    </div>
  );
};

export default FilterPriceSlide;