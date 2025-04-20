/**
 * A thin wrapper that *is* constructable, wrapping the native TVEventHandler
 */
export default class TVEventHandler {
    private subscription;
    enable(component: any, callback: (cmp: any, evt: {
        eventType?: string;
    }) => void): void;
    disable(): void;
}
