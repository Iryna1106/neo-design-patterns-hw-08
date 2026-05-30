import { BaseRenderer } from "./BaseRenderer";

export class MarkdownRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    return `${"#".repeat(level)} ${text}`;
  }

  renderParagraph(text: string): string {
    return text;
  }

  renderList(items: string[]): string {
    return items.map((item) => `- ${item}`).join("\n");
  }
}
