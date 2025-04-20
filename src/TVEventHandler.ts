// src/TVEventHandler.ts
import { NativeEventEmitter, NativeModules, EmitterSubscription } from 'react-native';

const { TVEventHandler: TVEventHandlerModule } = NativeModules;

/**
 * A thin wrapper that *is* constructable, wrapping the native TVEventHandler
 */
export default class TVEventHandler {
  private subscription: EmitterSubscription | null = null;

  enable(component: any, callback: (cmp: any, evt: { eventType?: string }) => void) {
    if (!TVEventHandlerModule) {
      console.warn('TVEventHandler native module not available');
      return;
    }
    const emitter = new NativeEventEmitter(TVEventHandlerModule);
    this.subscription = emitter.addListener('onHWKeyEvent', (event: any) => {
      callback(component, event);
    });
  }

  disable() {
    this.subscription?.remove();
    this.subscription = null;
  }
}
