# IOET Interview Excercise 🌟


Console Typescript application to search for all matching times of acme employees in the office.
##  Prerequisite 💙
- [Node.js](https://nodejs.org/es/) Installed

- [Git](https://git-scm.com/ "Git OFficial") Installed


## How to run 🛠️
1. Install dependencies `npm install`
2. Compile project `npm run build`
3. Run project `npm run start`

## Allowed params 🚀
By default the repository contains an .txt file but also
allow to include the path of `.txt`
file that contains the acme employees ejm:
`npm run start path=../Desktop/acme_employees.info`

## Examples ⚙️


### Input
```Bash
RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00 
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00 
ALANYS=MO12:00-13:00,TH01:00-14:00,SU20:00-21:00,FR23:00-23:59
```
### Output
```Bash
ALANYS-ANDRES: 3 
ALANYS-ASTRID: 3
ALANYS-RENE: 3
ANDRES-ASTRID: 3 
ANDRES-RENE: 2 
ASTRID-RENE: 2 
```

## How to run the Test 👷
`npm run test`

