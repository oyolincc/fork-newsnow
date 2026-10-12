import { describe, expect, it, vi } from 'vite-plus/test'
import { createOverlay } from './OverlayManager'

const Component = () => null

describe('createOverlay', () => {
  it('settles a replaced instance without allowing stale callbacks to close its replacement', async () => {
    const overlay = createOverlay<{ title: string }, boolean>(Component)
    const first = overlay.open('confirm', { title: 'First' })
    const stale = overlay.get('confirm')
    const second = overlay.open('confirm', { title: 'Second' })
    await expect(first).resolves.toBeUndefined()
    stale.onOpenChange?.({ open: false })
    stale.onExitComplete?.()
    expect(overlay.get('confirm').title).toBe('Second')
    expect(overlay.get('confirm').open).toBe(true)
    await overlay.close('confirm', false)
    await expect(second).resolves.toBe(false)
  })

  it('preserves falsy return values and handles closing before Viewport mounts', async () => {
    const overlay = createOverlay<{}, number>(Component)
    const result = overlay.open('queued', {})
    const exit = overlay.waitForExit('queued')
    await overlay.close('queued', 0)
    await expect(result).resolves.toBe(0)
    await exit
    expect(overlay.has('queued')).toBe(false)
    await overlay.close('queued')
    await overlay.waitForExit('missing')
  })

  it('removes one instance without affecting others or stranding its pending promises', async () => {
    const overlay = createOverlay<{}>(Component)
    const first = overlay.open('first', {})
    const second = overlay.open('second', {})
    const exit = overlay.waitForExit('first')
    overlay.remove('first')
    await expect(first).resolves.toBeUndefined()
    await exit
    expect(overlay.has('second')).toBe(true)
    overlay.removeAll()
    await expect(second).resolves.toBeUndefined()
    expect(overlay.getSnapshot()).toEqual([])
  })

  it('settles every result and exit promise on removeAll', async () => {
    const overlay = createOverlay<{}>(Component)
    const results = [overlay.open('a', {}), overlay.open('b', {})]
    const exits = [overlay.waitForExit('a'), overlay.waitForExit('b')]
    overlay.removeAll()
    await expect(Promise.all(results)).resolves.toEqual([undefined, undefined])
    await Promise.all(exits)
    overlay.removeAll()
    overlay.remove('missing')
    expect(overlay.getSnapshot()).toEqual([])
  })

  it('updates business props and callbacks while retaining manager-owned controls', async () => {
    const initialChange = vi.fn()
    const nextChange = vi.fn()
    const injectedReturn = vi.fn()
    const overlay = createOverlay<{ title: string }>(Component, {
      props: { onOpenChange: initialChange },
    })
    const result = overlay.open('edit', { title: 'Initial' })
    const before = overlay.get('edit')
    const snapshot = overlay.getSnapshot()
    expect(overlay.getSnapshot()).toBe(snapshot)
    overlay.update('edit', {
      title: 'Updated',
      open: false,
      onOpenChange: nextChange,
      setReturnValue: injectedReturn,
    })
    const after = overlay.get('edit')
    expect(after.title).toBe('Updated')
    expect(after.open).toBe(true)
    expect(after.onOpenChange).toBe(before.onOpenChange)
    expect(after.setReturnValue).toBe(before.setReturnValue)
    expect(overlay.getSnapshot()).not.toBe(snapshot)
    after.onOpenChange?.({ open: false })
    await expect(result).resolves.toBeUndefined()
    expect(nextChange).toHaveBeenCalledWith({ open: false })
    expect(initialChange).not.toHaveBeenCalled()
    expect(injectedReturn).not.toHaveBeenCalled()
  })

  it('keeps closing even if a user callback throws', async () => {
    const overlay = createOverlay<{}>(Component, {
      props: {
        onOpenChange: () => {
          throw new Error('User callback')
        },
      },
    })
    const result = overlay.open('error', {})
    expect(() => overlay.get('error').onOpenChange?.({ open: false })).toThrow('User callback')
    await expect(result).resolves.toBeUndefined()
    expect(overlay.has('error')).toBe(false)
  })

  it('does not close a replacement opened from a user callback', async () => {
    const overlay = createOverlay<{}>(Component)
    let replacement: Promise<unknown> | undefined
    const original = overlay.open('reentrant', {
      onOpenChange: () => {
        replacement = overlay.open('reentrant', {})
      },
    })
    overlay.get('reentrant').onOpenChange?.({ open: false })
    await expect(original).resolves.toBeUndefined()
    expect(overlay.get('reentrant').open).toBe(true)
    overlay.removeAll()
    await replacement
  })

  it('rejects reads and updates of unknown IDs without creating phantom entries', () => {
    const overlay = createOverlay<{}>(Component)
    expect(() => overlay.get('missing')).toThrow('not found')
    expect(() => overlay.update('missing', {})).toThrow('not found')
    expect(overlay.getSnapshot()).toEqual([])
  })
})
