'use strict';

const { GetQueueUrlCommand } = require('@aws-sdk/client-sqs');
const { sqsClient } = require('./sqsClient.js');

// Set the parameters
const params = {
	QueueName: 'package',
	Attributes: {
		DelaySeconds: Math.random(Math.floor()*100), // Number of seconds delay.
		MessageRetentionPeriod: '60', // Number of seconds delay.
	},
};

const run = async () => {
	try {
		const data = await sqsClient.send(new GetQueueUrlCommand(params));
		console.log('Success', data);
		return data; // For unit tests.
	} catch (err) {
		console.log('Error', err);
	}
};

run();

