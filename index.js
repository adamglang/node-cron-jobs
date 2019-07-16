const schedule = require('node-schedule');
const mysqlBackup = require('./mysql-backup');

schedule.scheduleJob({ hour: 22, minute: 0 }, mysqlBackup);
