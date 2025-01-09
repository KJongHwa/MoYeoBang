interface RatingProps {
  rating: number;
  maxRating?: number;
  width: number;
  height: number;
}

/**
 * 공통 Rating 컴포넌트
 * @param rating <number> 색이 칠해져야하는 하트의 갯수
 * @param maxRating <number> 최대 하트의 갯수 (기본값 : 5)
 * @param width <number> 표현할 width 값
 * @param height <number> 표현할 height 값
 */
export default function Rating({
  rating,
  maxRating = 5,
  width,
  height,
}: RatingProps) {
  const starWidth = width / maxRating;
  const filledWidth = (rating / maxRating) * width;

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
    <div className="inline-block" style={containerStyle} aria-label="별점 평가">
      <span className="inline-block bg-repeat-x" style={backgroundStyle}>
        <span className="inline-block bg-repeat-x" style={filledStyle} />
      </span>
    </div>
  );
}
