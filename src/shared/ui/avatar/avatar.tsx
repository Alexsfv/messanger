import clsx from 'clsx'
import { UserIcon } from '../icons/icons'
import type { AvatarProps } from './types'
import styles from './avatar.module.css'

export function Avatar({ size = 'm' }: AvatarProps) {
  return (
    <span className={clsx(styles.avatar, styles[size])} aria-hidden>
      <UserIcon />
    </span>
  )
}
