import { Message, EmbedBuilder } from 'discord.js';

import Bot from '../../structures/client';
import Command from '../../structures/command';

class Help extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'help',
            aliases: ['help'],
        });
    }

    async run(
        message: Message,
        [cmd]: string[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        guildPrefix: string
    ): Promise<void> {

        if (!cmd) {
            this.defaultHelp(message);
            return;
        }

        const command = this.client.commands[cmd.toLowerCase()] as Command;

        if (!command) {
            message.reply('Command not found');
            return;
        }

        const embed = new EmbedBuilder()
        .setColor('#7417d3')
        .setAuthor({ name: `${command.name} command information`, iconURL: this.client.user.avatarURL() })
        .setThumbnail(this.client.user.avatarURL())
        .setDescription([
            `**Name:** ${command.name}`,
            `**Description:** ${command.description}`,
            `**Permissions:** ${command.userPermissions.length ? command.userPermissions.map((p) => `\`${p}\``).join(', ') : 'None'}`,
            '\u200b',
            '**Deatil Information:**',
            `${command.description.length ? command.description.join('\n') : 'No detail information provided'}`,
        ].join('\n'))
        .setFooter({ text: `Category: ${command.category} | Total Command: ${Object.keys(this.client.commands).length}` });

        message.reply({ embeds: [embed] });
        return;
    }

    async defaultHelp(i: Message): Promise<void> {
        const category = new Set([ ...Object.values(this.client.commands).map((cmd) => cmd.category) ]);

        const embed = new EmbedBuilder()
        .setColor('#7417d3')
        .setTitle(`${this.client.user.username} Help List`)
        .setThumbnail(this.client.user.avatarURL());

        for (const c of category) {
            const cmd = Object.values(this.client.commands).filter((cmd) => cmd.category === c);
            const command = cmd.map((c) => c.name);

            embed.addFields([
                {
                    name: c,
                    value: command.map((c) => `\`${c}\``).join(', ')
                }
            ]);
        }

        i.reply({ embeds: [embed] });
        return;
    }
}

export default Help;