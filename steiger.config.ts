import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // В небольшом приложении у каждого слайса один потребитель: слияние убрало бы границы фич
      'fsd/insignificant-slice': 'off',
    },
  },
])
