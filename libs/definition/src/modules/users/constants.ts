export const fz = Object.freeze

export const AuthType = fz({
  GITHUB: 'github',
})
export type AuthType = (typeof AuthType)[keyof typeof AuthType]
