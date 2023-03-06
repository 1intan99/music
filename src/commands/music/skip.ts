import { Message } from 'discord.js';

import Bot from '../../structures/client';
import Command from '../../structures/command';

class Skip extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'skip',
            aliases: ['skip'],
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

        player.skip();
        message.react('✅');
        return;
    }
}

export default Skip;