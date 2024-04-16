import { Role } from './Role';

export class User {
  email: string;
  id: string;
  role: Role;
  sum: number;
  elements: number;

  constructor(userData: any) {
    this.email = userData.email;
    this.id = userData.uid;
    this.sum = 0;
    this.elements = 0;
    if (userData.role != null) {
      this.role = userData.role;
    } else
      this.role = {
        guest: false,
        client: true,
        manager: false,
        admin: false,
        banned: false,
      };
  }
}
