import { Message } from 'discord.js';

import Bot from '../../structures/client';
import Command from '../../structures/command';

class Volume extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'volume',
            aliases: ['volume'],
            category: 'Music'
        });
    }

    async run(
        message: Message,
        [volume]: string[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        guildPrefix: string
    ): Promise<void> {
        const player = this.client.player.player(message.guild.id);

        if (!player) {
            message.reply('No player available here.');
            return;
        }

        let vol = parseInt(volume);
        if (vol > 100) vol = 100;
        else if (vol < 0) vol = 0;

        player.setVolume(vol);
        message.react('✅');
        return;
    }
}

export default Volume;