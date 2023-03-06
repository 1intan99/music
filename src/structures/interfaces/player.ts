import { KazagumoPlayer, KazagumoTrack, PlayerMovedChannels, PlayerMovedState } from 'kazagumo';
import { WebSocketClosedEvent, TrackStuckEvent, PlayerUpdate, TrackExceptionEvent } from 'shoukaku';

export interface PlayerOptions {
    name: string;
    emiter: keyof KazagumoEvents;
    disable?: boolean;
}

export interface KazagumoEvents {
    playerStart: [listener: (player: KazagumoPlayer, track: KazagumoTrack) => void];
    playerResolveError: [listener: (player: KazagumoPlayer, track: KazagumoTrack, message?: string) => void];
    playerDestroy: [listener: (player: KazagumoPlayer) => void];
    playerCreate: [listener: (player: KazagumoPlayer) => void];
    playerEnd: [listener: (player: KazagumoPlayer) => void];
    playerEmpty: [listener: (player: KazagumoPlayer) => void];
    playerClosed: [listener: (player: KazagumoPlayer, data: WebSocketClosedEvent) => void];
    playerStuck: [listener: (player: KazagumoPlayer, data: TrackStuckEvent) => void];
    playerResumed: [listener: (player: KazagumoPlayer) => void];
    playerMoved: [listener: (player: KazagumoPlayer, state: PlayerMovedState, channels: PlayerMovedChannels) => void];
    playerException: [listener: (player: KazagumoPlayer, data: TrackExceptionEvent) => void];
    playerUpdate: [listener: (player: KazagumoPlayer, data: PlayerUpdate) => void];
}