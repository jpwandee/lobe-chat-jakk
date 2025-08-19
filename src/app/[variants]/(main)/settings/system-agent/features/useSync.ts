import { FormInstance }
import { useLayoutEffect }

import { useUserStore }

export const usesyncsystemagent = (form: FormInstance, settings: any) => {
  useLayoutEffect(() => {
    // Set initial form values
    form.setFieldsValue(settings)

    // Sync form values with updated settings
    const unsubscribe = useUserStore.subscribe(
      (s) => s.settings.systemAgent,
      (newSettings) => {
        form.setFieldsValue(newSettings)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [form, settings])
}
