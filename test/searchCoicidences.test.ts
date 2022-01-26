import {
    parseEmployeesInfo,
    searchEmployeesCoincidences,
    separateEmployeesInfo,
    validateInputFormat
} from "../src/methods";
import * as fs from "fs";

const inputFile = fs.readFileSync(`${__dirname}/employees_test.txt`, 'utf8');

describe('Test that the employee info is parsed and validated correctly', () => {
    it('Generate array from txt file', () => {
        const employees = separateEmployeesInfo(inputFile)
        expect(employees).toHaveLength(4)
    })
    it('Validate input row correctly', () => {
        const inputData = ['RENE=MO10:00-12:00', 'ASTRID=LUNES10:00-13:00', 'ALANYS=MO24:00-00:00']
        const errors = validateInputFormat(inputData)
        expect(errors).toHaveLength(2)
    })
    it('Generate keys according to all worked days', () => {
        const employees = separateEmployeesInfo(inputFile)
        const parsedData = parseEmployeesInfo(employees)
        expect(Object.keys(parsedData)).toHaveLength(6)
    })
})
describe('Test find all coincidences of employees at the office', () => {
    it('Return object key=[employees that match] value=[days that they match]', () => {
        const employees = separateEmployeesInfo(inputFile)
        const parsedData = parseEmployeesInfo(employees)
        const coincidences = searchEmployeesCoincidences(parsedData)
        const expectedAssert = [
            {'employeesMatch': 'ALANYS-ANDRES', 'timesThatMatch': 3},
            {'employeesMatch': 'ALANYS-ASTRID', 'timesThatMatch': 3},
            {'employeesMatch': 'ALANYS-RENE', 'timesThatMatch': 3},
            {'employeesMatch': 'ANDRES-ASTRID', 'timesThatMatch': 3},
            {'employeesMatch': 'ANDRES-RENE', 'timesThatMatch': 2},
            {'employeesMatch': 'ASTRID-RENE', 'timesThatMatch': 2},
        ]
        Object.keys(coincidences).sort().forEach((match, index) => {
            expect(match).toBe(expectedAssert[index]['employeesMatch'])
            const timesThatMatch = coincidences[match].size
            expect(timesThatMatch).toBe(expectedAssert[index]['timesThatMatch'])
        })
    })

})