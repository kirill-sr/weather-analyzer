'use client'
import {subDays} from "date-fns";

export function getLastStartDate(): Date {
  const lastStartDateItem = localStorage.getItem('lastStartDate')

  return lastStartDateItem ? new Date(lastStartDateItem) : subDays(new Date, 30)
}

export function getLastEndDate() {
  const lastEndDateItem = localStorage.getItem('lastEndDate')

  return lastEndDateItem ? new Date(lastEndDateItem) : new Date
}

