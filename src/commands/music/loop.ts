import { Message } from 'discord.js';

import Bot from '../../structures/client';
import Command from '../../structures/command';

class Loop extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'loop',
            aliases: ['loop'],
            category: 'Music'
        });
    }

    async run(
        message: Message,
        [mode]: string[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        guildPrefix: string
    ): Promise<void> {
        const player = this.client.player.player(message.guild.id);

        if (!player) {
            message.reply('No player available here.');
            return;
        }

        if (player.paused) {
            message.react('❌');
            return;
        }

        if (mode === 'queue') {
            player.setLoop('queue');
            message.react('✅');
        } else if (mode === 'track') {
            player.setLoop('track');
            message.react('✅');
        } else if (mode === 'of') {
            player.setLoop('none');
            message.react('✅');
        }
    }
}

export default Loop;