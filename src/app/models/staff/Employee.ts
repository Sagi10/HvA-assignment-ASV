export class Employee {
  private static EMPLOYEE_NUMBER = 0;
  private id: number;
  private firstname: string;
  private lastname: string;
  private role: string;
  private email: string;
  private password: string;

  constructor(firstname: string, lastname: string, email: string, password: string, role: string, id: number) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
    this.id = id;
    this.password = password;
    this.email = email;
  }

  getId(): number {
    return this.id;
  }

  getFirstname(): string {
    return this.firstname;
  }

  getLastname(): string {
    return this.lastname;
  }

  getRole(): string {
    return this.role;
  }
}
