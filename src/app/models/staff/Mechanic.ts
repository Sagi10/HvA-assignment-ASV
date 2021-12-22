import {Employee} from './Employee';
import {Functions} from './Functions';

export class Mechanic extends Employee {

  constructor(name: string, lastname: string, email: string, password: string, id: number) {
    super(name, lastname, email, password, Functions.MECHANIC, id);
  }

  getId(): number {
    return super.getId();
  }

  getRole(): string {
    return super.getRole();
  }
}
