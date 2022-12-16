const { companyMaster, workingDays } = require("../../../data/models")
const sequelize = require("sequelize")




function workingDays()

workingDays.create({
    month: 'JAN',
    year: '2022',
    workingDays: 22,
    days:31,
},
    {
        month: 'feb',
        year: '2022',
        workingDays: 20,
        days:28,

    },
    {
        month: 'mar',
        year: '2022',
        workingDays: 23,
        days:31,
    },
    {
        month: 'apr',
        year: '2022',
        workingDays: 20,
        days:30,
    },
    {
        month: 'may',
        year: '2022',
        workingDays: 23,
        days:31,
    },

    {
        month: 'jun',
        year: 2022,
        workingDays: 22,
        days:30,
    },
    {
        month: 'jul',
        year: '2022',
        workingDays: 21,
        days:31,
    },
    {
        month: 'aug',
        year: '2022',
        workingDays: 23,
        days:31,
    },
    {
        month: 'sep',
        year: '2022',
        workingDays: 21,
        days:30,
    },
    {
        month: 'oct',
        year: '2022',
        workingDays: 22,
        days:31,
    },
    {
        month: 'nov',
        year: '2022',
        workingDays: 22,
        days:30,
    },
    {
        month: 'dec',
        year: '2022',
        workingDays: 22,
        days:31,
    }
)








