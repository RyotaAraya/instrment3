import type { Filter } from 'types'

export const PROGRESS: Filter[] = [
  { label: '未着手', name: 'notStarted' },
  { label: '点検中', name: 'doing' },
  { label: '延期', name: 'postponed' },
  { label: '完了', name: 'done' },
]

export const PROGRESS_LIST = {
  notStarted: '未実施',
  doing: '点検中',
  postponed: '延期',
  done: '完了',
}
