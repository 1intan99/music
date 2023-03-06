/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlayerOptions, KazagumoEvents } from './interfaces/player';

import Bot from './client';

class PlayerEvents {
  client: Bot;
  name: string;
  emiter: keyof KazagumoEvents;
  disable: boolean;

  constructor(client: Bot, opt: PlayerOptions) {
    this.client = client;
    this.name = opt.name;
    this.emiter = opt.emiter;
    this.disable = opt.disable || false;
  }

  async load(...args: any) {
    this.run(...args).catch((er) => console.error(er));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(...args: any) {
    throw new Error('Unimplementd Run fucntion');
  }
}

export default PlayerEvents;
