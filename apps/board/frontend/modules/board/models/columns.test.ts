import { describe, expect, it } from 'vite-plus/test'
import { ColumnIds, DefaultColumnSources } from './columns'

describe('board columns', () => {
  it('does not expose the official updated column', () => {
    expect(ColumnIds).toEqual(['focus', 'hottest', 'realtime'])
  })

  it('does not repeat a source inside a fixed column', () => {
    expect(new Set(DefaultColumnSources.hottest).size).toBe(DefaultColumnSources.hottest.length)
    expect(new Set(DefaultColumnSources.realtime).size).toBe(DefaultColumnSources.realtime.length)
  })
})
