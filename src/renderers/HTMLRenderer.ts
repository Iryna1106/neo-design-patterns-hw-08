import { BaseRenderer } from "./BaseRenderer";

export class HTMLRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    return `<h${level}>${this.escape(text)}</h${level}>`;
  }

  renderParagraph(text: string): string {
    return `<p>${this.escape(text)}</p>`;
  }

  renderList(items: string[]): string {
    const lis = items
      .map((item) => `  <li>${this.escape(item)}</li>`)
      .join("\n");
    return `<ul>\n${lis}\n</ul>`;
  }

  wrapDocument(content: string): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    h2 {
      color: #2c3e50;
      margin-top: 2em;
    }
    ul {
      list-style-type: disc;
      padding-left: 2em;
    }
  </style>
</head>
<body>
${content}
</body>
</html>`;
  }
}
