'use client'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {CustomDatePickerProps} from "@/app/types/dataTypes";

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({defaultDate, label, changeValue}) => {
    return (
        <div>
            <p>{label}</p>
            <DatePicker
                showIcon
                selected={defaultDate}
                onChange={(newDate) => changeValue(newDate)}
            />
        </div>

    );
}