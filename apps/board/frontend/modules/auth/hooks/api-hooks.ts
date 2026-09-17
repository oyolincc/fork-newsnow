import { useQuery } from '@tanstack/react-query'
import { getAuthStatus } from '../api'

export const authKeys = {
  all: ['auth'] as const,
  // 这个查询只问“服务器有没有开启 GitHub 登录”，结果和具体用户无关，可以一直缓存。
  status: () => [...authKeys.all, 'status'] as const,
  // 这个查询根据 HttpOnly Cookie 获取当前用户；登录回跳或恢复缓存时都用同一个 key。
  currentUser: () => [...authKeys.all, 'current-user'] as const,
}

export const useAuthStatus = () =>
  useQuery({ queryKey: authKeys.status(), queryFn: getAuthStatus, staleTime: Infinity })
