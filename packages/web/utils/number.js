export const formatToken = (number) => {
  return number && Intl.NumberFormat('ja-JP').format(number)
}
