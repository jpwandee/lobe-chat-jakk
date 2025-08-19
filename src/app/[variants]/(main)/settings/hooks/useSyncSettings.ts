import { FormInstance }
import { useLayoutEffect }

import { useUserStore }

export const usesyncsettings = (form: FormInstance) => {
  useLayoutEffect(() => {
    // set the first time
    form.setFieldsValue(useUserStore.getState().settings)

    // sync with later updated settings
    const unsubscribe = useUserStore.subscribe(
      (s) => s.settings,
      (settings) => {
        form.setFieldsValue(settings)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [])
}
