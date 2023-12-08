kafka-topics.sh --bootstrap-server kafka:9092 --describe --topic chatroom3

kafka-topics.sh --bootstrap-server kafka:9092 --topic chatroom3 --create --partitions 1 --replication-factor 2

kafka-topics.sh --bootstrap-server kafka:9092 --list
