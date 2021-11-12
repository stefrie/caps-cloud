'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

const { Consumer } = require('sqs-consumer');
const faker = require('faker');
const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-2:451744660005:pickup';

const order = {
	orderId: faker.datatype.uuid(),
	customer: faker.name.findName(),
	vendorId: faker.company.companyName()
}

const payload = {
	Message: JSON.stringify(order),
	TopicArn: topic
}

sns.publish(payload).promise().then(data => {
	console.log(data);
}).catch(e => {
	console.log(e);
});

const queueUrl = 'https://sqs.us-west-2.amazonaws.com/451744660005/vendor';

const consumer = Consumer.create({
	queueUrl: queueUrl,
	handleMessage: (message) => {
		console.log(message);
	}
})

consumer.start();
