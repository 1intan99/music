import { Message, } from 'discord.js';

import Bot from '../../structures/client';
import Command from '../../structures/command';

class Play extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'play',
            aliases: ['play'],
            category: 'Music'
        });
    }

    async run(
        message: Message,
        [...args]: string[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        guildPrefix: string
    ): Promise<void> {
        const song = args.join(' ');

        const { channel } = message.member.voice;

        if (!channel) {
            message.reply('You must be in voice channel.');
            return;
        }

        this.client.player.makePlayer(message, song, channel);
        return;
    }
}

export default Play;