const{ companyMaster,workingDays}=require("../../../data/models")
const sequelize = require("sequelize")




function workingDays()

workingDays.create({
    month: 'JAN',
    year: '2022',
    workingDays: 22,
},
{
    month: 'feb',
    year: '2022',
    workingDays: 20,

} ,
{
    month: 'mar',
    year: '2022',
    workingDays: 23,  
} ,
{
    month: 'apr',
    year: '2022',
    workingDays: 20,  
} ,
{
    month: 'may',
    year: '2022',
    workingDays: 23,  
} ,

{
    month: 'jun',
    year: 2022,
    workingDays: 22,  
} ,
{
    month: 'jul',
    year: '2022',
    workingDays: 21,  
} ,
{
    month: 'aug',
    year: '2022',
    workingDays: 23,  
} ,
{
    month: 'sep',
    year: '2022',
    workingDays: 21,  
} ,
{
    month: 'oct',
    year: '2022',
    workingDays: 22,  
} ,
{
    month: 'nov',
    year: '2022',
    workingDays: 22,  
} ,
{
    month: 'dec',
    year: '2022',
    workingDays: 22,  
} 
)








