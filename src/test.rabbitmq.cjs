const amqp = require('amqplib');

async function connectToRabbitMQ() {
  const config = {
    username: 'admin',
    password: 'password',
    host: 'host.docker.internal', // Change to 'host.docker.internal' if necessary
    port: 5672,
  };

  const amqpUrl = `amqp://${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@${config.host}:${config.port}`;
  console.log("Connecting to RabbitMQ with URL:", amqpUrl);

  try {
    const connection = await amqp.connect(amqpUrl);
    console.log("RabbitMQ Connected!");

    const channel = await connection.createChannel();
    console.log("RabbitMQ Channel Created");

    // Close the channel and connection
    await channel.close();
    await connection.close();
    console.log("RabbitMQ Connection Closed");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

connectToRabbitMQ();