import { describe, expect, it } from 'vite-plus/test'
import { sourceCatalog, type SourceID } from '@newsnow/definition/backend'
import { sourceRegistry } from './registry'

describe('source registry', () => {
  it('registers every canonical source in the catalog', () => {
    const canonicalSourceIds = Object.entries(sourceCatalog)
      .filter(([, source]) => !('redirect' in source))
      .map(([sourceId]) => sourceId as SourceID)

    expect(canonicalSourceIds.filter((sourceId) => !sourceRegistry[sourceId])).toEqual([])
  })
})
