import { useQueryState }

import { FilesTabs } from '@/types/files'

export const useFileCategory = () =>
  useQueryState('category', { clearOnDefault: true, defaultValue: FilesTabs.All })
