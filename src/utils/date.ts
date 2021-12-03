import { default as dayjs } from 'dayjs'

export const formatDate = (
  date: number,
  template: string = 'YYYY/MM/dd hh:mm'
) => dayjs(date).format(template)
