import { DocNode } from "../interfaces/DocNode";
import { DocRenderer } from "../interfaces/DocRenderer";
import { RenderEventPublisher } from "../RenderEventPublisher";

export class Paragraph implements DocNode {
  constructor(private text: string, private renderer: DocRenderer) {}

  render(): string {
    const start = Date.now();
    const result = this.renderer.renderParagraph(this.text);
    const renderTime = Date.now() - start;

    RenderEventPublisher.notify({
      type: "Paragraph",
      content: this.text,
      renderTime,
    });

    return result;
  }
}
