interface ScrollTimePickerProps {
  selectedHour: number;
  selectedMinute: number;
  selectedPeriod: string;
  onHourChange: (value: number) => void;
  onMinuteChange: (value: number) => void;
  onPeriodChange: (value: string) => void;
}

export default function ScrollTimePicker({
  selectedHour,
  selectedMinute,
  selectedPeriod,
  onHourChange,
  onMinuteChange,
  onPeriodChange,
}: ScrollTimePickerProps) {
  const hours = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handlePeriodToggle = () => {
    onPeriodChange(selectedPeriod === 'AM' ? 'PM' : 'AM');
  };

  return (
    <div className="flex w-[325px] flex-col rounded-md bg-default-tertiary p-5 text-secondary-5 md:w-auto md:flex-row">
      <div className="flex flex-col gap-3 border-t-[1px] border-solid border-secondary-80 pb-2 pt-4 md:border-l-[1px] md:border-t-0 md:pb-0 md:pl-4 md:pr-2 md:pt-0">
        <button
          type="button"
          className={`rounded-md px-[14px] py-[10px] text-xl font-bold ${
            selectedPeriod === 'AM' ? 'bg-default-primary' : ''
          } hover:bg-primary-50`}
          onClick={handlePeriodToggle}
        >
          AM
        </button>
        <button
          type="button"
          className={`rounded-md px-[14px] py-[10px] text-xl font-bold ${
            selectedPeriod === 'PM' ? 'bg-default-primary' : ''
          } hover:bg-primary-50`}
          onClick={handlePeriodToggle}
        >
          PM
        </button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="scrollbar-thin scrollbar-thumb-secondary-80 scrollbar-track-secondary-80 flex overflow-x-scroll border-y-[1px] border-solid border-secondary-80 py-4 md:flex-col md:overflow-y-scroll md:border-x-[1px] md:border-y-0 md:px-4 md:py-0">
          {hours.map((hour) => (
            <button
              type="button"
              key={hour}
              className={`rounded-md p-3 text-center ${
                selectedHour === hour ? 'bg-default-primary' : ''
              } hover:bg-primary-50`}
              onClick={() => onHourChange(hour)}
            >
              {hour.toString().padStart(2, '0')}
            </button>
          ))}
        </div>

        <div className="scrollbar-thin scrollbar-thumb-secondary-80 scrollbar-track-secondary-80 flex overflow-x-scroll border-b-[1px] border-solid border-secondary-80 pb-4 md:flex-col md:overflow-y-scroll md:border-b-0 md:border-r-[1px] md:pb-0 md:pr-4">
          {minutes.map((minute) => (
            <button
              type="button"
              key={minute}
              className={`rounded-md p-3 text-center ${
                selectedMinute === minute ? 'bg-default-primary' : ''
              } hover:bg-primary-50`}
              onClick={() => onMinuteChange(minute)}
            >
              {minute.toString().padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
