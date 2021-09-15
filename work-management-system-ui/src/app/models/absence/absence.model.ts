export class Absence {
    absenceId: string;
    confirmed: boolean;
    startDate: string;
    endDate: string;
    absenceTypeId: string;
    userId: string;

    constructor(startDate, endDate, absenceTypeId, userId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.absenceTypeId = absenceTypeId;
        this.userId = userId;
    }
}
