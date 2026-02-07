import 'dotenv/config';
import amqp from 'amqplib';
import PlaylistsService from './PlaylistsService.js';
import MailSender from './MailSender.js';
import Listener from './Listener.js';
import config from './utils/config.js';

const init = async () => {
  const playlistsService = new PlaylistsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, mailSender);

  const connection = await amqp.connect(config.rabbitMq.server);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', { durable: true });

  channel.consume('export:playlists', listener.listen, { noAck: true });

  console.log("Consumer berjalan.. Menunggu pesan di queue 'export:playlists'");
};

init();
