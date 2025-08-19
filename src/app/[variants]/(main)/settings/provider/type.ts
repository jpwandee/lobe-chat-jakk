import { ProviderConfigProps }

export interface provideritem extends omit<providerconfigprops, 'id' | 'source'> {
  id: string;
}
