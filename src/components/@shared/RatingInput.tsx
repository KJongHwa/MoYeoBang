import React, { useState } from 'react';

interface RatingInputProps {
  rating: number;
  maxRating?: number;
  width: number;
  height: number;
  onChange: (value: number, name: 'rating') => void;
}

/**
 * 공통 RatingInput 컴포넌트
 * @param rating <number> 색이 칠해져야하는 하트의 갯수
 * @param maxRating <number> 최대 하트의 갯수 (기본값 : 5)
 * @param width <number> 표현할 width 값
 * @param height <number> 표현할 height 값
 * @param onChange <function> Rating 값이 변경될 때 실행될 함수
 */
export default function RatingInput({
  rating,
  maxRating = 5,
  width,
  height,
  onChange,
}: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseOut = () => setHoverRating(null);
  const handleSelect = (nextValue: number) => onChange(nextValue, 'rating');

  // 마우스를 hover 했을 때, rating 값이 변경되는 걸 보여주기 위한 이벤트 핸들러
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const calculatedHoverRating = Math.ceil((hoverX / width) * maxRating);
    setHoverRating(calculatedHoverRating);
  };

  // 마우스를 click 했을 때, rating 값이 최종 변경되도록 실행하는 이벤트 핸들러
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newRating = Math.ceil((clickX / width) * maxRating);
    handleSelect(newRating);
  };

  const starWidth = width / maxRating;
  const filledWidth = ((hoverRating || rating) / maxRating) * width;

  // inline 스타일을 위한 객체
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const backgroundStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundSize: `${starWidth}px ${height}px`,
    backgroundImage: `url('/HeartLine.svg')`,
  };

  const filledStyle = {
    width: `${filledWidth}px`,
    height: `${height}px`,
    backgroundSize: `${starWidth}px ${height}px`,
    backgroundImage: `url('/HeartFull.svg')`,
  };

  return (
    <div
      className="inline-block"
      style={containerStyle}
      aria-label="별점 평가"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseOut}
    >
      <span className="inline-block bg-repeat-x" style={backgroundStyle}>
        <span className="inline-block bg-repeat-x" style={filledStyle} />
      </span>
    </div>
  );
}
