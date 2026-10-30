export function useFormatTime() {
  const formatTime = (isoStr: string): string => {
    const diff = (Date.now() - new Date(isoStr).getTime()) / 1000
    if (diff < 60)    return 'agora'
    if (diff < 3600)  return `${Math.floor(diff / 60)} min`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    return `${Math.floor(diff / 86400)}d`
  }
  return { formatTime }
}
