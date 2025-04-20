// src/TVEventHandler.ts
import { NativeEventEmitter, NativeModules } from 'react-native';
const { TVEventHandler: TVEventHandlerModule } = NativeModules;
/**
 * A thin wrapper that *is* constructable, wrapping the native TVEventHandler
 */
export default class TVEventHandler {
    constructor() {
        this.subscription = null;
    }
    enable(component, callback) {
        if (!TVEventHandlerModule) {
            console.warn('TVEventHandler native module not available');
            return;
        }
        const emitter = new NativeEventEmitter(TVEventHandlerModule);
        this.subscription = emitter.addListener('onHWKeyEvent', (event) => {
            callback(component, event);
        });
    }
    disable() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.remove();
        this.subscription = null;
    }
}
