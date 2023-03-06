import { TextChannel } from 'discord.js';
import { KazagumoPlayer } from 'kazagumo';

import Bot from '../structures/client';
import Event from '../structures/player';

class PlayerEmpty extends Event {
    constructor(client: Bot) {
        super(client, {
            name: 'Empty',
            emiter: 'playerEmpty'
        });
    }

    async run(player: KazagumoPlayer): Promise<void> {
        const channel = this.client.channels.cache.get(player.textId) as TextChannel;

        channel.send('Destroyed player due to inactivity.');
        player.destroy();
    }
}

export default PlayerEmpty;