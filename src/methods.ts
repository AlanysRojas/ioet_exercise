import {EmployeeSchedule, EmployeesCoincidences, InfoFormatExpression, WorkedDays} from "./models";

const parseMilitaryHourToNumber = (hour: string): number => Number(hour.replace(':', ''));

export const separateEmployeesInfo = (textContent: string): Array<string> => {
    return textContent.trim()
        .split('\n')
        .map((employee) => employee.trim().replace('\r', ''));
}

export const validateInputFormat = (employees: Array<string>): Array<string> => {
    const errors = employees.reduce((errors: Array<string>, employeeInfo, index) => {
        if (!InfoFormatExpression.test(employeeInfo)) {
            errors.push(`Invalid input row:${index + 1}, please verify that the employee info was entered correctly`);
        }
        return errors;
    }, [])
    return errors;
}

export const parseEmployeesInfo = (employees: Array<string>): WorkedDays => {
    let mappedInfoByDay: WorkedDays = {}
    employees.forEach(employee => {
        const employeeData = employee.trim().split('=');
        const name = employeeData[0];
        const schedule = employeeData[1].split(',');
        schedule.map(days => {
            const day = days.slice(0, 2);
            const startHour = parseMilitaryHourToNumber(days.slice(2, 7));
            const endHour = parseMilitaryHourToNumber(days.slice(8, 13));
            if (!mappedInfoByDay[day]) mappedInfoByDay[day] = []
            mappedInfoByDay[day].push({'name': name, 'starts': startHour, 'ends': endHour})
        })
    })
    return mappedInfoByDay
}

export const searchEmployeesCoincidences = (workedDays: WorkedDays): EmployeesCoincidences => {
    let coincidences: EmployeesCoincidences = {}
    Object.keys(workedDays).forEach(day => {
        const employeesSchedule = workedDays[day];
        if (employeesSchedule.length <= 1) return; // Skip if only one person has worked in this day
        employeesSchedule.forEach((schedule: EmployeeSchedule, index: number, arr: Array<EmployeeSchedule>) => {
            arr.forEach((comparedSchedule: EmployeeSchedule, subIndex: number) => {
                if (index == subIndex) return;
                const combinationOfNames = [schedule.name, comparedSchedule.name].sort().toString().replace(',', '-');
                if (!coincidences[combinationOfNames]) coincidences[combinationOfNames] = new Set()
                if (schedule.starts <= comparedSchedule.starts && comparedSchedule.ends <= schedule.ends) {
                    coincidences[combinationOfNames].add(day)
                    return;
                }
                if (
                    comparedSchedule.starts <= schedule.starts &&
                    schedule.starts <= comparedSchedule.ends &&
                    comparedSchedule.ends <= schedule.ends
                ) {
                    coincidences[combinationOfNames].add(day)
                    return;
                }
                if (
                    comparedSchedule.starts <= schedule.starts &&
                    schedule.ends <= comparedSchedule.ends
                ) {
                    coincidences[combinationOfNames].add(day)
                    return;
                }
                if (
                    schedule.starts <= comparedSchedule.starts &&
                    comparedSchedule.starts <= schedule.ends &&
                    schedule.ends <= comparedSchedule.ends
                ) {
                    coincidences[combinationOfNames].add(day)
                    return;
                }
            })
        })
    })
    return coincidences;
}