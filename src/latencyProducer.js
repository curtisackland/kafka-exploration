const { Kafka, CompressionTypes, logLevel} = require('kafkajs');
const readline = require('readline');
const readlineSync = require('readline-sync');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9093'],
    logLevel: logLevel.ERROR
});

const topic = 'chatroom1';
const producer = kafka.producer();
producer.connect().then();

const sendMessage = () => {
    return producer
        .send({
            topic,
            messages: [{
                key: `${Math.random()}`,
                value: `${new Date().getTime()}`,
            }]
        })
        .then(console.log)
        .catch(e => console.error(`${e.message}`, e))
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startLatency() {
    startTime = Date.now();
    currentTime = Date.now();
    // duration = 10000; // 10 seconds
    counter = 0;
    while(counter < 1000) {
        counter++;
        await sleep(0.01);
        sendMessage().then();
    }
    console.log("Done!");
}

startLatency();


