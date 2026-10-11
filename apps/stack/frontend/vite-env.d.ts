/// <reference types="vite/client" />
/// <reference types="@tanstack/react-start" />

declare module '#server-runtime' {
  export const handleApiRequest: (request: Request) => Promise<Response>
}
