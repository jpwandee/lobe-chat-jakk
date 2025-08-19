import { createContext }

export interface providersettingscontextvalue {
  modelEditable?: boolean;
  sdkType?: string;
  showAddNewModel?: boolean;
  showDeployName?: boolean;
  showModelFetcher?: boolean;
}

export const ProviderSettingsContext = createContext<ProviderSettingsContextValue>({})
