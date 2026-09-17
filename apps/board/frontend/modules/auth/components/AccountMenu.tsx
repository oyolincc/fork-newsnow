import { DotsThreeCircleIcon, GithubLogoIcon, SignInIcon, SignOutIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSession } from '../hooks/session'

export function AccountMenu() {
  const session = useSession()
  const [opened, setOpened] = useState(false)
  return (
    <span
      className="relative"
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}>
      {session.user?.profile.avatar ? (
        <button
          type="button"
          aria-label="账户菜单"
          className="h-6 w-6 rounded-full bg-cover"
          style={{ backgroundImage: `url(${session.user.profile.avatar}&s=24)` }}
          onClick={() => setOpened((value) => !value)}
        />
      ) : (
        <button
          type="button"
          aria-label="更多"
          className="btn opacity-50 hover:opacity-[.85]"
          onClick={() => setOpened((value) => !value)}>
          <DotsThreeCircleIcon weight="duotone" />
        </button>
      )}
      {/* 电脑移入头像即可打开，手机可以点击打开；鼠标移出头像和菜单所在的整个区域后才关闭。 */}
      {opened && (
        <div className="absolute right-0 top-4 z-[99] w-52 pt-4">
          <motion.ol
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="rounded-lg bg-zinc-200/85 p-2 shadow-xl backdrop-blur-md dark:bg-zinc-800/85">
            {session.enabled &&
              (session.user ? (
                <li>
                  <button type="button" className="menu-item" onClick={session.logout}>
                    <SignOutIcon weight="duotone" />
                    退出登录
                  </button>
                </li>
              ) : (
                <li>
                  <button type="button" className="menu-item" onClick={session.login}>
                    <SignInIcon weight="duotone" />
                    GitHub 账号登录
                  </button>
                </li>
              ))}
            <li>
              <a
                className="menu-item"
                href="https://github.com/ourongxing/newsnow"
                target="_blank"
                rel="noreferrer">
                <GithubLogoIcon weight="duotone" />
                Star on GitHub
              </a>
            </li>
            <li className="flex items-center gap-2 p-1">
              <a href="https://github.com/ourongxing/newsnow" target="_blank" rel="noreferrer">
                <img
                  alt="GitHub stars"
                  src="https://img.shields.io/github/stars/ourongxing/newsnow?logo=github&style=flat&labelColor=%235e3c40&color=%23614447"
                />
              </a>
              <a href="https://github.com/ourongxing/newsnow/fork" target="_blank" rel="noreferrer">
                <img
                  alt="GitHub forks"
                  src="https://img.shields.io/github/forks/ourongxing/newsnow?logo=github&style=flat&labelColor=%235e3c40&color=%23614447"
                />
              </a>
            </li>
          </motion.ol>
        </div>
      )}
    </span>
  )
}
