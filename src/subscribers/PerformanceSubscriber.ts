import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class PerformanceSubscriber implements RenderEventSubscriber {
  private totalMs = 0;

  update(context: RenderContext): void {
    // Sections wrap their children, so the root section's renderTime equals
    // the total wall-clock cost of the tree. Taking the max yields the total.
    if (context.renderTime !== undefined && context.renderTime > this.totalMs) {
      this.totalMs = context.renderTime;
    }
  }

  report(): void {
    console.log(`[Performance] Total render time: ${this.totalMs}ms`);
  }
}
