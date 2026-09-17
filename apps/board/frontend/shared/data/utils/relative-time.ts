export function formatRelativeTime(value: number | string) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getDay())) return ''
  const seconds = (Date.now() - date.getTime()) / 1_000
  const minutes = seconds / 60
  const hours = minutes / 60
  if (seconds < 60) return '刚刚'
  if (minutes < 60) return `${Math.floor(minutes)}分钟前`
  if (hours < 24) return `${Math.floor(hours)}小时前`
  return `${date.getMonth() + 1}月${date.getDate()}日`
}
