export function getDate (date) {
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}
export function getTime (date) {
  const newDate = new Date(date)
  return newDate.toLocaleTimeString('it-IT')
}
