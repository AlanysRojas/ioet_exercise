export interface EmployeeSchedule {
    name: string;
    starts: number;
    ends: number;
}

export interface WorkedDays {
    [key: string]: Array<EmployeeSchedule>
}

export interface EmployeesCoincidences {
    [key: string]: Set<string>
}

export const InfoFormatExpression = /^([A-Za-z])+=(((MO|TH|SU|TU|SA|FR|WE)([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)),?)+$/