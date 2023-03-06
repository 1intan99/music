import Bot from '../structures/client';
import Command from '../structures/command';
import Event from '../structures/event';
import Payload from '../structures/payload';
import Nodes from '../../nodes.json';

import path from 'path';
import glob from 'glob';
import { Kazagumo } from 'kazagumo';
import { Connectors } from 'shoukaku';
import PlayerEvents from '../structures/player';
import KazagumoPlugin from 'kazagumo-spotify';

class Loader {
  client: Bot;
  constructor(client: Bot) {
    this.client = client;
  }

  get path() {
    return path.dirname(require.main.filename);
  }

  async loadCommands() {
    const commands = await this.getFiles(`${this.path}/commands/**/*.js`);
    let i = 0;

    process.on('uncaughtException', (er) =>
      this.client.logger.error('uncaught error', er)
    );

    this.client.commands = {};
    this.client.cooldowns = {};
    this.client.aliases = {};
    this.client.logger.info('Loading commands...');
    delete require.cache[`${this.path}/structures/command.js`];

    for (const filePath of commands) {
      delete require.cache[filePath];
      const { name } = path.parse(filePath);
      if (name === 'index') continue;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const File = require(filePath).default;
      const Command: Command = new File(this.client);

      if (!Command.aliases.length) {
        this.client.logger.error(
          `${name} Comand doesn't have aliases, skipping to the next command`
        );
        continue;
      }

      this.client.commands[Command.aliases[0]] = Command;
      this.client.cooldowns[Command.aliases[0]] = {};

      for (const alias of Command.aliases.slice(1))
        this.client.aliases[alias] = Command.aliases[0];
      i++;
    }

    this.client.logger.info(`${i} Commands loaded.`);
  }

  async loadEvents() {
    const events = await this.getFiles(`${this.path}/events/**/*.js`);
    let i = 0;

    this.client.events = {};
    this.client.logger.info('Loading events...');
    delete require.cache[`${this.path}/structures/event.js`];
    for (const filePath of events) {
      delete require.cache[filePath];

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const File = require(filePath).default;

      const Event: Event = new File(this.client);
      if (Event.disable) continue;
      this.client.events[Event.name] = Event;
      this.client.on(Event.emiter, Event.load.bind(Event));
      i++;
    }

    this.client.logger.info(`${i} Events loaded.`);
  }

  lavalinkLoad() {
    this.client.kazagumo = new Kazagumo({
      defaultSearchEngine: 'youtube',
      send: (guildId, payload) => {
        const guild = this.client.guilds.cache.get(guildId);
        if (guild) guild.shard.send(payload);
      },
      plugins: [ new KazagumoPlugin({ clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET })]
    }, new Connectors.DiscordJS(this.client), Nodes);
  }

  async lavalinkPayload() {
    const events = await this.getFiles(`${this.path}/payload/**/*.js`);
    let i = 0;

    this.client.payloadEvent = {};
    this.client.logger.info('Loading lavalink events...');
    delete require.cache[`${this.path}/structures/payload.js`];
    for (const filePath of events) {
      delete require.cache[filePath];

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const File = require(filePath).default;

      const Event: Payload = new File(this.client);
      if (Event.disable) continue;
      this.client.payloadEvent[Event.name] = Event;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.client.kazagumo.shoukaku.on(Event.emiter as any, Event.load.bind(Event));
      i++;
    }

    this.client.logger.info(`${i} Lavalink Events loaded.`);
  }

  async lavalinkPlayer() {
    const events = await this.getFiles(`${this.path}/player/**/*.js`);
    let i = 0;

    this.client.playerEvent = {};
    this.client.logger.info('Loading player events...');
    delete require.cache[`${this.path}/structures/player.js`];
    for (const filePath of events) {
      delete require.cache[filePath];

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const File = require(filePath).default;

      const Event: PlayerEvents = new File(this.client);
      if (Event.disable) continue;
      this.client.playerEvent[Event.name] = Event;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.client.kazagumo.on(Event.emiter as any, Event.load.bind(Event));
      i++;
    }

    this.client.logger.info(`${i} Player Events loaded.`);
  }

  async getFiles(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      glob(path, (er, files) => {
        if (er) return reject(er);
        resolve(files);
      });
    });
  }
}

export default Loader;
