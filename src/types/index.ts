
export type KeyStatus = 'disponivel' | 'retirada';

export interface Key {
  id: string;
  code: string;
  environment: string;
  status: KeyStatus;
}

export interface Employee {
  id: string;
  registration: string;
  name: string;
  segment: string;
  active: boolean;
}

export interface Movement {
  key: string;
  employee: string;
  withdrawnAt: string;
  returnedAt: string | null;
}

