import { DocRenderer } from "../interfaces/DocRenderer";

export abstract class BaseRenderer implements DocRenderer {
  abstract renderHeader(level: number, text: string): string;
  abstract renderParagraph(text: string): string;
  abstract renderList(items: string[]): string;

  wrapDocument(content: string): string {
    return content;
  }

  protected escape(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
} 