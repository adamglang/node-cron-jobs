const spawn = require('child_process').spawn;
const s3Upload = require('s3-stream-upload');
const moment = require('moment');
const config = require('../config');

async function mysqlBackup() {
	const upload = s3Upload({
		accessKeyId: config.aws.accessKey,
		secretAccessKey: config.aws.secretKey,
		Bucket: config.aws.buckets.backup.name,
		region: config.aws.buckets.backup.region,
	});

	const s3 = upload({ Key: `mysql-backup-${moment().format('YYYY-MM-DD-HH-mm-ss')}.sql` });

	const mysqldump = spawn('mysqldump', [
		'-u', config.db.connection.user,
		`-p ${config.db.connection.password}`,
		config.db.connection.database,
	]);

	try {
		await mysqldump.stdout.pipe(s3);
	} catch (e) {
		console.error(e);
	}
}

module.exports = mysqlBackup;
