import {Employee} from './Employee';
import {Functions} from './Functions';

/**
 * This class is for the Admin,
 * The Admin has the functionality to access everything that other users are able to do
 */
export class Admin extends Employee {
  constructor(name: string, lastname: string, email: string, password: string, id: number) {
    super(name, lastname, email, password, Functions.ADMIN, id);
  }

  getId(): number {
    return super.getId();
  }

  getRole(): string {
    return super.getRole();
  }
}
