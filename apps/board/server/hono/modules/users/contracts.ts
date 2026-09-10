import * as v from 'valibot'

export const $S_UserSyncState = v.object({
  data: v.record(v.string(), v.array(v.string())),
  updatedTime: v.pipe(v.number(), v.integer(), v.minValue(0)),
})
