export class User {
    userId: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    vacationDaysCount: number;

    constructor(username, password, firstName, lastName) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
