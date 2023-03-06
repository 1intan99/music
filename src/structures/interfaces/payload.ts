import { Player } from 'shoukaku';

export interface PayloadOptions {
    name: string;
    emiter: keyof ShoukakuEvents;
    disable?: boolean;
}

export interface ShoukakuEvents {
    reconnecting: [listener: (name: string, info: string, tries: number, triesLeft: number, reconnectInterval: number) => void];
    debug: [listener: (name: string, info: string) => void];
    error: [listener: (name: string, error: Error) => void];
    ready: [listener: (name: string, reconnected: boolean) => void];
    close: [listener: (name: string, code: number, reason: string) => void];
    disconnect: [listener: (name: string, players: Player[], moved: boolean) => void];
}
