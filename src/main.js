const { Kafka, CompressionTypes, logLevel} = require('kafkajs');
const readline = require('readline');
const readlineSync = require('readline-sync');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9093'],
    logLevel: logLevel.ERROR
});

const userName = readlineSync.question('Enter your username: ');

async function consumerFunction() {
    const consumer = kafka.consumer({ groupId: `${userName}` })

    await consumer.connect()
    await consumer.subscribe({ topic: 'chatroom1', fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        // key is the username and value is the message
        console.log(message.key + " - " + message.value.toString())
    },

    })
}

const sendMessage = (msg) => {
    return producer
        .send({
            topic,
            messages: [{
                key: `${userName}`,
                value: new Date().getTime() + ": " + msg,
            }]
        })
        .then()
        .catch(e => console.error(`${e.message}`, e))
}

const topic = 'chatroom1';
const producer = kafka.producer();
producer.connect().then();

consumerFunction().then();

// Create an interface for reading and writing to the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to process user input
async function processInput(input) {

    //setInterval(sendMessage, 3000)
    await sendMessage(input);

    // Ask for the next input
    rl.question('', processInput);
}

// Ask for input
rl.question('\n', processInput);


// Event handler for when the readline interface is closed
rl.on('close', function () {
    console.log('Goodbye!');
    process.exit(0);
});
