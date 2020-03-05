const { RDS_HOSTNAME, RDS_PASSWORD, RDS_USERNAME, RDS_PORT } = require('./env')

module.exports = awsDB = {
  host: RDS_HOSTNAME,
  user: RDS_USERNAME,
  password: RDS_PASSWORD,
  port: RDS_PORT,
  database: 'postgres',
}
