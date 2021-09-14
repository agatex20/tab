export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;

    constructor(username, password, firstName, lastName) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
