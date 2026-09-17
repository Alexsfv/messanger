import type { ComponentProps } from 'react'

export type ButtonVariant = 'primary' | 'icon'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
}
