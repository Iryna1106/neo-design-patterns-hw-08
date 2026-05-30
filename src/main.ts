import { writeFileSync } from "fs";
import { RendererFactory, RendererType } from "./factories/RendererFactory";
import { Section } from "./nodes/Section";
import { Paragraph } from "./nodes/Paragraph";
import { List } from "./nodes/List";
import { RenderEventPublisher } from "./RenderEventPublisher";
import { RenderLoggerSubscriber } from "./subscribers/RenderLoggerSubscriber";
import { SummaryCollector } from "./subscribers/SummaryCollector";
import { PerformanceSubscriber } from "./subscribers/PerformanceSubscriber";

function createDocument(format: RendererType): string {
  const renderer = RendererFactory.create(format);
  const doc = new Section("Структурні патерни", renderer, [], 1);

  const patterns = new Section(
    "Основні патерни",
    renderer,
    [
      new Paragraph("Розглянемо два важливих структурних патерни.", renderer),
      new Section(
        "Composite",
        renderer,
        [
          new Paragraph(
            "Дозволяє створювати деревоподібні структури об'єктів.",
            renderer
          ),
          new List(
            ["Спрощує структуру", "Гнучкий код", "Легка підтримка"],
            renderer
          ),
        ],
        2
      ),
      new Section(
        "Bridge",
        renderer,
        [
          new Paragraph("Розділяє абстракцію та реалізацію.", renderer),
          new List(["Незалежні зміни", "Краща масштабованість"], renderer),
        ],
        2
      ),
    ],
    2
  );

  doc.add(patterns);
  return doc.render();
}

const { format, output } = {
  format: (process.argv[2] || "markdown") as RendererType,
  output: process.argv[3],
};

const logger = new RenderLoggerSubscriber();
const summary = new SummaryCollector();
const perf = new PerformanceSubscriber();

RenderEventPublisher.subscribe(logger);
RenderEventPublisher.subscribe(summary);
RenderEventPublisher.subscribe(perf);

const content = createDocument(format);
const renderer = RendererFactory.create(format);
const result = renderer.wrapDocument(content);

summary.report();
perf.report();

output ? writeFileSync(output, result) : console.log(result);
