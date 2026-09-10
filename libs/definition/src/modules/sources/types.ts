export const SourceOrigin = Object.freeze({
  LIVE: 'live',
  SNAPSHOT: 'snapshot',
})
export type SourceOrigin = (typeof SourceOrigin)[keyof typeof SourceOrigin]

export type SourceMetadata = {
  name: string
  column: string
  home: string
  color: string
  interval: number
  title?: string
  type?: 'hottest' | 'realtime'
  desc?: string
  redirect?: string
}
