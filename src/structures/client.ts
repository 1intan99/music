import BaseClient from './baseClient';
import Logger from '../utils/logger';
import Loader from '../utils/loader';
import CommonUtil from '../utils/common';
import PlayerHandler from '../utils/playerHandler';

class Bot extends BaseClient {
  constructor() {
    super();

    this.developers = JSON.parse(process.env.developers);
    this.logger = new Logger('BOT');
    this.loader = new Loader(this);
    this.util = new CommonUtil(this);
    this.player = new PlayerHandler(this);
  }

  async init() {
    await this.loader.loadCommands();
    await this.loader.loadEvents();
    await this.loader.lavalinkLoad();
    await this.loader.lavalinkPayload();
    await this.loader.lavalinkPlayer();

    this.login();
  }
}

export default Bot;
