const {workingDays,companyMaster}= require("../../../data/models");
const sequelize = require("sequelize");

function workingdays() {
 workingDays.workingDay.create(
{
    month:"JAN",
    year:"2022",
    workingDays:22
 },
 {
 month:"FEB",
 year:"2022",
 workingDays:20
},
{
    month:"MAR",
    year:"2022",
    workingDays:23
   },
   {
    month:"APR",
    year:"2022",
    workingDays:20
   },
   {
    month:"MAY",
    year:"2022",
    workingDays:23
   },
   {
    month:"JUN",
    year:"2022",
    workingDays:22
   },
   {
    month:"JUL",
    year:"2022",
    workingDays:21
   },
   {
    month:"AUG",
    year:"2022",
    workingDays:23
   },
   {
    month:"SEP",
    year:"2022",
    workingDays:21
   },
   {
    month:"OCT",
    year:"2022",
    workingDays:22
   },
   {
    month:"NOV",
    year:"2022",
    workingDays:22
   },
   {
    month:"DEC",
    year:"2022",
    workingDays:21
   },
)}
