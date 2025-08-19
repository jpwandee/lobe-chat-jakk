import { ProviderConfigProps }

export interface provideritem extends omit<providerconfigprops, 'id'> {
  id: string;
}
