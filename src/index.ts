import * as fs from 'fs';
import {parseEmployeesInfo, searchEmployeesCoincidences, separateEmployeesInfo, validateInputFormat} from "./methods";

(() => {
    const pathFromCLI = process.argv[2] ? process.argv[2].split('=')[1] : undefined
    const filePath = pathFromCLI ? pathFromCLI : `${__dirname}/../employees.txt`;
    if (!fs.existsSync(filePath)) {
        const errorMessage = pathFromCLI ?
            'please verify that the path entered is correct' :
            'please verify that employees.txt file exists'
        return console.error(`No file found, ${errorMessage}`);
    }
    const inputFile = fs.readFileSync(filePath, 'utf8');

    //The newline in linux and windows are different and here we ensure that the file is parsed correctly
    const employees = separateEmployeesInfo(inputFile);
    const errorsInInputInfo = validateInputFormat(employees);
    if (errorsInInputInfo.length) {
        return console.error(errorsInInputInfo.join('\n'))
    }
    const mappedInfoByDay = parseEmployeesInfo(employees);
    const coincidences = searchEmployeesCoincidences(mappedInfoByDay)
    Object.keys(coincidences).sort().forEach((employeeCombination) => {
        console.info(`${employeeCombination}: ${coincidences[employeeCombination].size}`)
    })
})()