import {EmployeeSchedule} from "./models";

const parseMilitaryHourToNumber = (hour: string): number => Number(hour.replace(':', ''));

export const parseEmployeesInfo = (employees:Array<string>) => {
    let mappedInfoByDay: { [key: string]: Array<EmployeeSchedule> } = {}
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
