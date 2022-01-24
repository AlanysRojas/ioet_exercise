# ioet interview excercise

## Description
Console Typescript application to search for all matching times of acme employees in the office.

## Methodology
The methodology used in this project was Extreme programming, following respectively the stages of analysis, design, coding and testing.

## How to run
1. Install dependencies `npm install`
2. Compile project `npm run build`
3. Run project `npm run start`

## Allowed params
By default the repository contains an .txt file but also
allow to include the path of `.txt` 
file that contains the acme employees ejm: <br/>
`npm run start path=../Desktop/acme_employees.info`

## Examples

### Input
RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00 <br />
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00 <br />
ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00 <br />
ALANYS=MO12:00-13:00,TH01:00-14:00,SU20:00-21:00,FR23:00-23:59 <br />
### Output
ALANYS-ANDRES: 3 <br />
ALANYS-ASTRID: 3 <br />
ALANYS-RENE: 3 <br />
ANDRES-ASTRID: 3 <br />
ANDRES-RENE: 2 <br />
ASTRID-RENE: 2 <br />

## Test
`npm run test`

