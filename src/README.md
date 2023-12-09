# Replicate experiment
## Setup
In project root foler
~~~bash
docker compose up -d
~~~


Then check if the partitions exist within the Kafka cluster.
~~~bash
kafka-topics.sh --bootstrap-server kafka:9092 --list
~~~
If any are missing, add them with
~~~bash
kafka-topics.sh --bootstrap-server kafka:9092 --topic chatroom1 --create --partitions 1 --replication-factor 1
kafka-topics.sh --bootstrap-server kafka:9092 --topic chatroom2 --create --partitions 2 --replication-factor 1
kafka-topics.sh --bootstrap-server kafka:9092 --topic chatroom3 --create --partitions 1 --replication-factor 2
~~~


## Running
cd to src folder for these steps

~~~bash
npm install
~~~

Start consumer
~~~bash
node latencyConsumer.js
~~~
Wait a few seconds for the consumer to connect, then run
~~~bash
./runmany
~~~
in a new terminal

When all jobs are complete use ctrl+c to terminate the consumer node terminal

the results are stored in times.txt
