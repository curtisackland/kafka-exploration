kafka-topics.sh --bootstrap-server kafka:9092 --describe --topic chatroom3

kafka-topics.sh --bootstrap-server kafka:9092 --topic chatroom1 --create --partitions 1 --replication-factor 1
kafka-topics.sh --bootstrap-server kafka:9092 --topic chatroom2 --create --partitions 2 --replication-factor 1
kafka-topics.sh --bootstrap-server kafka:9092 --topic chatroom3 --create --partitions 1 --replication-factor 2

kafka-topics.sh --bootstrap-server kafka:9092 --list
