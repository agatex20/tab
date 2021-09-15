export class LeaveRequest {
    id: number;
    startDate: string;
    endDate: string;
    type: string;
    employee: string;

    constructor(startDate, endDate, type, employee) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
        this.employee = employee;
    }
}
