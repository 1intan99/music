import { Client, IntentsBitField } from 'discord.js';
import { Kazagumo } from 'kazagumo';

import Logger from '../utils/logger';
import Loader from '../utils/loader';
import Command from './command';
import Event from './event';
import CommonUtil from '../utils/common';
import Payload from './payload';
import PlayerEvents from './player';
import PlayerHandler from '../utils/playerHandler';

class BaseClient extends Client {
  developers: string[];
  logger: Logger;
  commands: Record<string, Command>;
  aliases: Record<string, string>;
  cooldowns: Record<string, Record<string, number>>;
  events: Record<string, Event>;
  payloadEvent: Record<string, Payload>;
  playerEvent: Record<string, PlayerEvents>;
  loader: Loader;
  util: CommonUtil;
  kazagumo: Kazagumo;
  player: PlayerHandler;

  constructor() {
    super({
      intents: [IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildVoiceStates],
    });
  }

  async init() {
    this.login();
  }
}

export default BaseClient;
