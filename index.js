// Employee class
class Employee {
    constructor(firstName, familyName, title, payPerHour) {
      this.firstName = firstName;
      this.familyName = familyName;
      this.title = title;
      this.payPerHour = payPerHour;
      this.timeInEvents = [];
      this.timeOutEvents = [];
    }
  }
  
  // Helper functions
  function createEmployeeRecord(record) {
    return new Employee(record[0], record[1], record[2], record[3]);
  }
  
  function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTimeString) {
    console.log("createTimeInEvent - dateTimeString:", dateTimeString); // Debugging statement
    const [date, hour] = dateTimeString.split(" ");
    employee.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour, 10) });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTimeString) {
    console.log("createTimeOutEvent - dateTimeString:", dateTimeString); // Debugging statement
    const [date, hour] = dateTimeString.split(" ");
    employee.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour, 10) });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);
  
    return payable;
  };
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor.call(employee), 0);
  }
  
  // Example usage
  const employeeRecordsData = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 100],
  ];
  const employeeRecords = createEmployeeRecords(employeeRecordsData);
  
  // Add timeIn and timeOut events for Loki
  const loki = employeeRecords.find(employee => employee.firstName === "Loki");
  console.log("loki:", loki); // Debugging statement
  createTimeInEvent(loki, "2023-06-30 09:00");
  createTimeOutEvent(loki, "2023-06-30 11:00");
  
  // Add timeIn and timeOut events for Natalia
  const natalia = employeeRecords.find(employee => employee.firstName === "Natalia");
  console.log("natalia:", natalia); // Debugging statement
  createTimeInEvent(natalia, "2023-06-30 09:30");
  createTimeOutEvent(natalia, "2023-06-30 18:30");
  
  console.log(wagesEarnedOnDate(loki, "2023-06-30")); // Output: 70
  console.log(wagesEarnedOnDate(natalia, "2023-06-30")); // Output: 800
  
  console.log(allWagesFor.call(loki)); // Output: 70
  console.log(allWagesFor.call(natalia)); // Output: 800
  
  console.log(calculatePayroll(employeeRecords)); // Output: 870
  
