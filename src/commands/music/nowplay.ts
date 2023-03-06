import { Message, EmbedBuilder, User } from 'discord.js';
import format from 'format-duration';

import Bot from '../../structures/client';
import Command from '../../structures/command';

class Nowplay extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'nowplay',
            aliases: ['nowplay'],
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

        const track = player.queue.current;

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(track.title)
        .setURL(track.realUri)
        .addFields([
            {
                name: 'Artist',
                value: track.author,
                inline: true
            },
            {
                name: 'Duration',
                value: format(track.length, { leading: true }),
                inline: true
            },
            {
                name: 'Volume',
                value: `${player.volume}%`,
                inline: true
            },
            {
                name: 'Requester',
                value: `${track.requester as User}`,
                inline: true
            }
        ])
        .setImage(track.thumbnail);

        message.channel.send({ embeds: [embed] });
    }
}

export default Nowplay;