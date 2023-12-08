const { Kafka, CompressionTypes, logLevel} = require('kafkajs');
const readline = require('readline');
const readlineSync = require('readline-sync');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9093'],
    logLevel: logLevel.ERROR
});

const topic = 'chatroom3';
async function consumerFunction() {
    const consumer = kafka.consumer({ groupId: `latencyConsumer` })

    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        // key is the username and value is the message
        const millisTime = new Date().getTime();
        console.log("Time set: " + message.value.toString() + " - Time received: " + millisTime + " = " + (millisTime - parseInt(message.value.toString())));
    },

    })
}

consumerFunction().then();

