const schedule = require('node-schedule');
const mysqlBackup = require('./mysql-backup');

mysqlBackup();
// schedule.scheduleJob({ hour: 0, dayOfWeek: 0 }, mysqlBackup);
