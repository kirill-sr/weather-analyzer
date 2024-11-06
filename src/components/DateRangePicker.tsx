import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {CustomDatePickerProps} from "@/types/dataTypes";
import {DateRange, Range} from 'react-date-range';
import React, {useState} from "react";

export const CustomDateRangePicker: React.FC<CustomDatePickerProps> = ({range, changeRange}) => {
  const [period, setPeriod] = useState<Range[]>([range])

  const changePeriod = (newRange: Range[]) => {
    if (newRange[0].startDate === newRange[0].endDate) {
      setPeriod(newRange)
      return
    }

    if (newRange[0].startDate && newRange[0].startDate !== period[0].startDate) {
      changeRange(newRange[0])
    }

    if (newRange[0].endDate && newRange[0].endDate !== period[0].endDate) {
      changeRange(newRange[0])
    }

    setPeriod(newRange)
  }

  return (
    <div>
      <DateRange
        onChange={item => changePeriod([item.selection])}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={period}
      />
    </div>

  );
}

