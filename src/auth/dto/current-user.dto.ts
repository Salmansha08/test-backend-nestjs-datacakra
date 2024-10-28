import { RoleType } from '@prisma/client';

export type currentUser = {
  id: string;
  email: string;
  role: RoleType;
};
