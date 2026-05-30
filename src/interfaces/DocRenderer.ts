export interface DocRenderer {
  renderHeader(level: number, text: string): string;
  renderParagraph(text: string): string;
  renderList(items: string[]): string;
  wrapDocument(content: string): string;
} 