export const MIGRATE_KEY = 'migrated'
export enum upgradestatus {
  START,
  UPGRADING,
  UPGRADED,
  UPGRADE_FAILED,
}

export const V1DB_NAME = 'LobeHub'
export const V1DB_TABLE_NAME = 'LOBE_CHAT'

export interface migrationerror {
  message: string;
  stack: string;
}
