import { Message } from 'discord.js';

import Bot from '../../structures/client';
import Command from '../../structures/command';

class Leave extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'leave',
            aliases: ['leave'],
            category: 'Music'
        });
    }

    async run(
        message: Message,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        args: string[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        guildPrefix: string
    ): Promise<void> {
        const player = this.client.player.player(message.guild.id);

        if (!player) {
            message.reply('No player available here.');
            return;
        }

        player.destroy();
        message.channel.send('Leaving voice channel.');
        message.react('✅');
    }
}

export default Leave;