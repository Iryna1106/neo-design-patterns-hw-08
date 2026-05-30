export interface RenderContext {
    type: 'Section' | 'Paragraph' | 'List';
    content: string;
    level?: number;
    items?: string[];
    renderTime?: number;
} 