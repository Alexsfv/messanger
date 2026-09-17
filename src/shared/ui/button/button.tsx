import clsx from 'clsx'
import type { ComponentProps } from 'react'
import styles from './button.module.css'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'icon'
}

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button type={type} className={clsx(styles.button, styles[variant], className)} {...props} />
  )
}
