import { RenderContext } from './RenderContext';

export interface RenderEventSubscriber {
    update(context: RenderContext): void;
} 