const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: String,
  name: String,
  sal: String,
  age: String,
  //img: String
});

const employee = mongoose.model('employee', employeeSchema, 'employee_tbl');

module.exports = employee;
