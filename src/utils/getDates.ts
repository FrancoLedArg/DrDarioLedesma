import { DateTime } from 'luxon'

export default function getDates () {
  const date = DateTime.local().plus({ days: 3 })

  let day1 = date.startOf('day')
  if (day1.weekday >= 6) {
    day1 = day1.plus({ weeks: 1 }).startOf('week')
  }

  let day2 = day1.plus({ days: 1 }).startOf('day')
  if (day2.weekday >= 6) {
    day2 = day2.plus({ weeks: 1 }).startOf('week')
  }

  let day3 = day2.plus({ days: 1 }).startOf('day')
  if (day3.weekday >= 6) {
    day3 = day3.plus({ weeks: 1 }).startOf('week')
  }

  const dates = [day1.toISO(), day2.toISO(), day3.toISO()]
  return dates
}
