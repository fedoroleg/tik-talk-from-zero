export interface Account {
  id: number;
  username: string;
  description: string;
  avatarUrl: string | null;
  subscriptionsAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
}

export type PatchAccountDTO = {
  id?: number;
  username?: string | null | undefined;
  description?: string | null | undefined;
  avatarUrl?: string | null | undefined;
  subscriptionsAmount?: number;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  isActive?: boolean;
  stack: string[];
  city?: string | null | undefined;
};
