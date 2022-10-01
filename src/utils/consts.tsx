import type { DropdownItem } from 'components/molecules/Dropdown'
import type { Item } from 'components/molecules/FilterGroup'
import type { Filter } from 'types'

export const PROGRESS: Filter[] = [
  { label: '未着手', name: 'notStarted' },
  { label: '実施中', name: 'doing' },
  { label: '延期', name: 'postponed' },
  { label: '完了', name: 'done' },
]
