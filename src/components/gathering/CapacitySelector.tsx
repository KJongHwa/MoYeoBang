import Image from 'next/image';

interface CapacitySelectorProps {
  capacity: number;
  setCapacity: (newCapacity: number) => void;
}

export default function CapacitySelector({
  capacity,
  setCapacity,
}: CapacitySelectorProps) {
  const incrementCapacity = () => {
    if (capacity < 6) {
      setCapacity(capacity + 1);
    }
  };

  const decrementCapacity = () => {
    if (capacity > 2) {
      setCapacity(capacity - 1);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold text-gray-800">
        모집 정원 (본인을 포함한 모집 정원)
      </h2>
      <div className="flex items-center justify-center">
        <Image
          src="/icons/minus.svg"
          alt="마이너스 아이콘"
          width={24}
          height={24}
          onClick={decrementCapacity}
          className={`cursor-pointer ${capacity <= 2 ? 'cursor-auto opacity-50' : ''}`}
        />
        <span className="mx-5 text-5xl font-bold">{capacity}</span>
        <Image
          src="/icons/plus.svg"
          alt="플러스 아이콘"
          width={24}
          height={24}
          onClick={incrementCapacity}
          className={`cursor-pointer ${capacity >= 6 ? 'cursor-auto opacity-50' : ''}`}
        />
      </div>
    </div>
  );
}
