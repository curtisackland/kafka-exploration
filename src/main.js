const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9093'],
});


async function producerFunction() {
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'chatroom1',
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })

    await producer.disconnect()
}

async function consumerFunction() {
    const consumer = kafka.consumer({ groupId: 'chatroom1' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'chatroom1', fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
        value: message.value.toString(),
        })
    },
    })
}

producerFunction();
//consumerFunction();

