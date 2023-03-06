import Bot from '../structures/client';
import Event from '../structures/payload';

class Ready extends Event {
  constructor(client: Bot) {
    super(client, {
      name: 'Ready',
      emiter: 'ready',
    });
  }

  async run(name: string, reconnect: boolean): Promise<void> {
    this.client.logger.info(`Lavalink connected to "${name}", connection is ${reconnect ? 'Reconnect' : 'New Connection'}`);
  }
}

export default Ready;
