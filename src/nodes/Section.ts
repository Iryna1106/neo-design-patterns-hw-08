import { DocNode } from "../interfaces/DocNode";
import { DocRenderer } from "../interfaces/DocRenderer";
import { RenderEventPublisher } from "../RenderEventPublisher";

export class Section implements DocNode {
  constructor(
    private title: string,
    private renderer: DocRenderer,
    private children: DocNode[] = [],
    private level: number = 1
  ) {}

  add(child: DocNode): void {
    this.children.push(child);
  }

  render(): string {
    const start = Date.now();

    const header = this.renderer.renderHeader(this.level, this.title);
    const childResults = this.children.map((child) => child.render());
    const result =
      childResults.length === 0
        ? header
        : `${header}\n\n${childResults.join("\n\n")}`;

    const renderTime = Date.now() - start;

    RenderEventPublisher.notify({
      type: "Section",
      content: this.title,
      level: this.level,
      renderTime,
    });

    return result;
  }
}
