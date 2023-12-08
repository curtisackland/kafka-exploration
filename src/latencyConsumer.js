const { Kafka, CompressionTypes, logLevel} = require('kafkajs');
const readline = require('readline');
const readlineSync = require('readline-sync');
const fs = require('fs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9093'],
    logLevel: logLevel.ERROR
});

const topic = 'chatroom1';
const times = [];
async function consumerFunction() {
    const consumer = kafka.consumer({ groupId: `latencyConsumer` })

    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        // key is the username and value is the message
        const millisTime = new Date().getTime();
        const difference = (millisTime - parseInt(message.value.toString()));
        times.push(difference);
        console.log("Time set: " + message.value.toString() + " - Time received: " + millisTime + " = " + difference);
    },

    })
}

consumerFunction().then();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('close', function () {
    console.log('Goodbye!');
    console.log(times[0]);
    fileContent = times.join('\n');
    console.log(fileContent);
    fs.writeFileSync('times.txt', fileContent);
    process.exit(0);
});

