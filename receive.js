'use strict';

// Import required AWS SDK clients and commands for Node.js
const { ReceiveMessageCommand } = require('@aws-sdk/client-sqs');
const { sqsClient } = require('./sqsClient.js');

// Set the parameters
const queueURL = 'package'; //SQS_QUEUE_URL; e.g., 'https://sqs.REGION.amazonaws.com/ACCOUNT-ID/QUEUE-NAME'
const params = {
	AttributeNames: ['SentTimestamp'],
	MaxNumberOfMessages: 10,
	MessageAttributeNames: ['All'],
	QueueUrl: queueURL,
	VisibilityTimeout: 20,
	WaitTimeSeconds: 0,
};

const run = async () => {
	try {
		const data = await sqsClient.send(new ReceiveMessageCommand(params));
		if (data.Messages)
			console.log(data); // For unit tests.
	} catch (err) {
		console.log('Receive Error', err);
	}
};

run();
