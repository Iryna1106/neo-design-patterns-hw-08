import { DocNode } from "../interfaces/DocNode";
import { DocRenderer } from "../interfaces/DocRenderer";
import { RenderEventPublisher } from "../RenderEventPublisher";

export class List implements DocNode {
  constructor(private items: string[], private renderer: DocRenderer) {}

  render(): string {
    const start = Date.now();
    const result = this.renderer.renderList(this.items);
    const renderTime = Date.now() - start;

    RenderEventPublisher.notify({
      type: "List",
      content: result,
      items: this.items,
      renderTime,
    });

    return result;
  }
}
