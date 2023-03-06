/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadOptions, ShoukakuEvents } from './interfaces/payload';

import Bot from './client';

class Payload {
  client: Bot;
  name: string;
  emiter: keyof ShoukakuEvents;
  disable: boolean;

  constructor(client: Bot, opt: PayloadOptions) {
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

export default Payload;
