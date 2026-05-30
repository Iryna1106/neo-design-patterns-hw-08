import { RenderEventSubscriber } from "./interfaces/RenderEventSubscriber";
import { RenderContext } from "./interfaces/RenderContext";

export class RenderEventPublisher {
  private static subscribers = new Set<RenderEventSubscriber>();

  static subscribe(subscriber: RenderEventSubscriber): void {
    this.subscribers.add(subscriber);
  }

  static unsubscribe(subscriber: RenderEventSubscriber): void {
    this.subscribers.delete(subscriber);
  }

  static notify(context: RenderContext): void {
    for (const subscriber of this.subscribers) {
      subscriber.update(context);
    }
  }
}
