import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class RenderLoggerSubscriber implements RenderEventSubscriber {
  update(context: RenderContext): void {
    switch (context.type) {
      case "Paragraph":
        console.log(`[Log] Rendered Paragraph (${context.content.length} chars)`);
        break;
      case "List":
        console.log(`[Log] Rendered List (${context.items?.length ?? 0} items)`);
        break;
      case "Section":
        console.log(
          `[Log] Rendered Section ("${context.content}", level ${context.level})`
        );
        break;
    }
  }
}
