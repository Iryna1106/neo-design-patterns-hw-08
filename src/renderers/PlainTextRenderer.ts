import { BaseRenderer } from "./BaseRenderer";

export class PlainTextRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    return level === 1 ? text.toUpperCase() : text;
  }

  renderParagraph(text: string): string {
    return text;
  }

  renderList(items: string[]): string {
    return items.map((item) => `- ${item}`).join("\n");
  }
}
