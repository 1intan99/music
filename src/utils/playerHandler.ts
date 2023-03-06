import { Message, TextChannel, VoiceBasedChannel, User } from 'discord.js';
import { KazagumoPlayer, KazagumoSearchResult } from 'kazagumo';
import { KazagumoTrack } from 'kazagumo/dist/Managers/Supports/KazagumoTrack';
import Bot from '../structures/client';

const spotifyReg = /https?:\/\/(?:open\.)?spotify.com\/(user|episode|playlist|track)\/(?:spotify\/playlist\/)?(\w*)/gm;


class PlayerHandler {
    client: Bot;
    constructor(client: Bot) {
        this.client = client;
    }

    player(guildId: string) {
        return this.client.kazagumo.players.get(guildId);
    }

    async makePlayer(message: Message, song: string, voice: VoiceBasedChannel) {

        const player = await this.client.kazagumo.createPlayer({
            guildId: message.guild.id,
            voiceId: voice.id,
            textId: message.channel.id,
            deaf: true,
            volume: 50
        });

        if (spotifyReg.test(song)) return this.spotifyHandle(message.author, player, song, message.channel as TextChannel);

        const result = await this.client.kazagumo.search(song, { requester: message.author });

        this.trackHandle(result, player, message.channel as TextChannel);
    }

    async trackHandle(result: KazagumoSearchResult, player: KazagumoPlayer, channel: TextChannel) {
        switch (result.type) {
            case 'PLAYLIST':
                for (const track of result.tracks) {
                    player.queue.add(track);
                }
                channel.send(`Added **${result.playlistName}** with **[${result.tracks.length}]** length.`);
                break;
            case 'TRACK':
                // eslint-disable-next-line no-case-declarations
                const track = result.tracks.shift();
                player.queue.add(track);
                channel.send(`Added **${track.title}** into the queue.`);
                break;
            default:
                channel.send('No result found.');
                break;
        }

        if (!player.playing && !player.paused) player.play();
    }

    async spotifyHandle(member: User, player: KazagumoPlayer, url: string, channel: TextChannel) {
        const result = await this.client.kazagumo.search(url, { requester: member });

        switch (result.type) {
            case 'PLAYLIST':
                for (const track of result.tracks) {
                    const convertedTrack = new KazagumoTrack(track.getRaw(), track.requester);
                    player.queue.add(convertedTrack);
                }
                channel.send(`Added **${result.playlistName}** with **[${result.tracks.length}]** length.`);
                break;
            case 'TRACK':
                // eslint-disable-next-line no-case-declarations
                const track = result.tracks.shift();
                // eslint-disable-next-line no-case-declarations
                const convertedTrack = new KazagumoTrack(track.getRaw(), track.requester);
                player.queue.add(convertedTrack);
                channel.send(`Added **${convertedTrack.title}** into the queue.`);
                break;
            default:
                channel.send('No result found.');
                break;
        }

        if (!player.playing && !player.paused) player.play();
        return;
    }

}

export default PlayerHandler;