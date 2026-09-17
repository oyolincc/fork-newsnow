import { afterEach, describe, expect, it, vi } from 'vite-plus/test'
import { formatRelativeTime } from './relative-time'

describe('formatRelativeTime', () => {
  afterEach(() => vi.useRealTimers())

  it('matches the official relative-time boundaries', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-12T12:00:00+08:00'))

    expect(formatRelativeTime('2026-09-12T11:59:30+08:00')).toBe('刚刚')
    expect(formatRelativeTime('2026-09-12T11:58:30+08:00')).toBe('1分钟前')
    expect(formatRelativeTime('2026-09-12T10:30:00+08:00')).toBe('1小时前')
    expect(formatRelativeTime('2026-09-10T12:00:00+08:00')).toBe('9月10日')
  })

  it('returns an empty string for missing or invalid values', () => {
    expect(formatRelativeTime(0)).toBe('')
    expect(formatRelativeTime('invalid')).toBe('')
  })
})
