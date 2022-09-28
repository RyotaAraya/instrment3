import type { DropdownItem } from 'components/molecules/Dropdown'
import type { Item } from 'components/molecules/FilterGroup'

export const PLANTS: DropdownItem[] = [
  { label: '1号ボイラー', value: '1BH' },
  { label: '2号ボイラー', value: '2BH' },
  { label: '1号発電機', value: '1SP' },
  { label: '2号発電機', value: '2SP' },
]

export const PLANTS2: Item[] = [
  { label: '1号ボイラー', name: '1BH' },
  { label: '2号ボイラー', name: '2BH' },
  { label: '1号発電機', name: '1SP' },
  { label: '2号発電機', name: '2SP' },
]
