import Bot from '../structures/client';
import Event from '../structures/player';

import { KazagumoPlayer, KazagumoTrack } from 'kazagumo';
import { TextChannel } from 'discord.js';

class PlayerStart extends Event {
    constructor(client: Bot) {
        super(client, {
            name: 'Start',
            emiter: 'playerStart'
        });
    }

    async run(player: KazagumoPlayer, track: KazagumoTrack): Promise<void> {
        const channel = this.client.channels.cache.get(player.textId) as TextChannel;

        channel.send(`Started playing **${track.title}**`);
    }
}

export default PlayerStart;