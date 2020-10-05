'use strict';

const { randomBytes } = require('crypto');
const { Pool } = require('pg');
const { S3 } = require('aws-sdk');

const pool = new Pool({
  connectionString: process.env.PG_CONN,
})

const s3 = new S3({ 
  endpoint: process.env.AWS_HOST, 
  accessKeyId: 'key', 
  secretAccessKey: 'secret', 
  region: 'us-east-1',
  s3ForcePathStyle: true
});

module.exports.hello = async event => {
  try {
    const { rows: time } = await pool.query('SELECT NOW()');

    const bucket = 'files';
    const key = Buffer.from(randomBytes(16)).toString('hex');

    await s3.createBucket({ Bucket: bucket }).promise();
    await s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: 'hello world!'
    }).promise();

    const objects = await s3.listObjects({ Bucket: bucket }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ time, objects }, null, 2)
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err, null, 2)
    };
  }
};