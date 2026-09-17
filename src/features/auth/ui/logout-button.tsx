import { Button, LogoutIcon } from '@/shared/ui'
import { logout } from '../model/logout'

export function LogoutButton() {
  return (
    <Button variant="icon" aria-label="Выйти" title="Выйти" onClick={logout}>
      <LogoutIcon />
    </Button>
  )
}
