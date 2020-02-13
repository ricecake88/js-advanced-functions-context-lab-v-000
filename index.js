/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(array_of_information) {
  return {
    'firstName' : array_of_information[0],
    'familyName' : array_of_information[1],
    'title' : array_of_information[2],
    'payPerHour': array_of_information[3],
    'timeInEvents': [],
    'timeOutEvents': []
  }
}

let createEmployeeRecords = function(array_of_employees) {
  return array_of_employees.map(createEmployeeRecord)
}

let createTimeInEvent = function(dateStamp) {
  let hour = parseInt(dateStamp.split(" ")[1]);
  let date = dateStamp.split(" ")[0];
  this.timeInEvents.push({'hour': hour, 'date': date, 'type': 'TimeIn'})
  return this
}

let createTimeOutEvent = function(dateStamp) {
  let hour = parseInt(dateStamp.split(" ")[1]);
  let date = dateStamp.split(" ")[0];
  this.timeOutEvents.push({'hour': hour, 'date': date, 'type': 'TimeOut'})
  return this
}

let hoursWorkedOnDate = function(date) {
  let timeInRecord = this.timeInEvents.find(day => day.date == date);
  let timeOutRecord = this.timeOutEvents.find(day => day.date == date);
  return (timeOutRecord.hour - timeInRecord.hour)/100
}

function wagesEarnedOnDate(date) {
  let hours = hoursWorkedOnDate.call(this, date);
  return hours * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(record => record.firstName == firstName);
}

function calculatePayroll(array_of_employees) {
  return array_of_employees.reduce((total, record) => allWagesFor.call(record) + total, 0)
}
