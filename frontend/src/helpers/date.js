import { parse, formatISO, parseISO, format } from "date-fns"
import es from "date-fns/locale/es"

export const convertToISO = (strDate) => {
  const newDate = parse(strDate, "dd/MM/yyyy", new Date())
  return formatISO(newDate)
}

export const displayDate = (isoDate) => {
  const newDate = parseISO(isoDate)
  const formattedDate = format(newDate, "PPPP", { locale: es })
  return formattedDate
}

export const convertToDDMMYYYY = (isoDate) => {
  const newDate = new Date(isoDate)
  const formattedDate = format(newDate, "dd/MM/yyyy")
  return formattedDate
}
