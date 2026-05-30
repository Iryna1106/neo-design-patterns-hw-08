# Домашнє завдання до Теми Поведінковий патерн Спостерігач

## Опис завдання

У цьому домашньому завданні необхідно додати до генератора документа (попереднє домашнє завдання) реактивний шар, який дозволяє відслідковувати процес рендерингу окремих елементів документа. Під час генерації кожен елемент `Paragraph`, `List`, `Section` має повідомляти про те, що він закінчив роботу. Реакція на ці події має реалізовуватись через механізм підписки — тобто через патерн Спостерігач (Observer).

Центральний об'єкт має називатися `RenderEventPublisher`, який зберігає список підписників і розсилає їм повідомлення про подію, що відбулася. Кожен підписник реалізує інтерфейс `RenderEventSubscriber`, який містить метод `update(context: RenderContext)`. Події передаються у вигляді об’єкта типу `RenderContext`, який включає тип елемента, його вміст, додаткову інформацію, як рівень заголовка, кількість пунктів у списку, а також час рендерингу.

Після інтеграції підписників, кожен елемент документа під час рендерингу зможе надсилати подію, на яку реагують підключені сервіси — наприклад, логування або збір статистики. Це дозволяє безболісно розширювати застосунок новими компонентами, такими як логери, аналітика, профайлери, системи повідомлень тощо.

## Структура проекту

```
src/
├── main.ts
├── RenderEventPublisher.ts
├── interfaces/
│   ├── RenderEventSubscriber.ts
│   ├── RenderContext.ts
│   ├── DocNode.ts
│   └── DocRenderer.ts
├── subscribers/
│   ├── RenderLoggerSubscriber.ts
│   ├── SummaryCollector.ts
│   └── PerformanceSubscriber.ts
├── nodes/
│   ├── Section.ts
│   ├── Paragraph.ts
│   └── List.ts
├── factories/
│   └── RendererFactory.ts
└── renderers/
    ├── HTMLRenderer.ts
    ├── MarkdownRenderer.ts
    ├── PlainTextRenderer.ts
    └── BaseRenderer.ts
```

## Як реалізовано патерн Observer

- Кожен елемент (Section, Paragraph, List) після рендеру викликає:
  ```ts
  RenderEventPublisher.notify(context);
  ```
- `RenderEventPublisher` — статичний клас, керує підписниками (subscribe/unsubscribe/notify)
- `RenderEventSubscriber` — інтерфейс підписника (метод update)
- `RenderContext` — об'єкт події (тип елемента, вміст, рівень, items, renderTime)
- Підписники (`subscribers/`):
  - `RenderLoggerSubscriber` — логування рендеру
  - `SummaryCollector` — підрахунок кількості елементів
  - `PerformanceSubscriber` — підрахунок часу рендеру

## Встановлення та запуск

```bash
npm install
npx ts-node src/main.ts markdown output.md   # зберегти у файл
npx ts-node src/main.ts html output.html
npx ts-node src/main.ts plain                 # вивести у консоль
```

## Приклад запуску і виводу

```bash
npx ts-node src/main.ts markdown output.md
```

У консолі підписники виводять події в порядку, у якому елементи завершують
рендер (post-order — спочатку діти, потім контейнер):

```
[Log] Rendered Paragraph (44 chars)
[Log] Rendered Paragraph (53 chars)
[Log] Rendered List (3 items)
[Log] Rendered Section ("Composite", level 2)
[Log] Rendered Paragraph (34 chars)
[Log] Rendered List (2 items)
[Log] Rendered Section ("Bridge", level 2)
[Log] Rendered Section ("Основні патерни", level 2)
[Log] Rendered Section ("Структурні патерни", level 1)
[Summary] Rendered 4 sections, 3 paragraphs, 2 lists
[Performance] Total render time: 1ms
```

Сам згенерований документ зберігається у файл `output.md`.

## Як створити нового підписника

Щоб додати новий вид реакції на події рендеру, достатньо реалізувати інтерфейс
`RenderEventSubscriber` і підписати його в `main.ts`. Жоден існуючий код
змінювати не потрібно — у цьому й перевага патерну Observer.

Приклад — підписник, який зберігає лог подій у JSON-файл:

```ts
// src/subscribers/FileLoggerSubscriber.ts
import { writeFileSync } from "fs";
import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class FileLoggerSubscriber implements RenderEventSubscriber {
  private events: RenderContext[] = [];

  update(context: RenderContext): void {
    this.events.push(context);
  }

  flush(path: string): void {
    writeFileSync(path, JSON.stringify(this.events, null, 2));
  }
}
```

Підключення в `main.ts`:

```ts
import { FileLoggerSubscriber } from "./subscribers/FileLoggerSubscriber";

const fileLogger = new FileLoggerSubscriber();
RenderEventPublisher.subscribe(fileLogger);

// ... існуючий код рендерингу ...

fileLogger.flush("render-events.json");
```

Після цього на кожне `notify(context)` новий підписник отримає подію разом з
усіма іншими — `RenderLoggerSubscriber`, `SummaryCollector`, `PerformanceSubscriber` —
без жодних змін у класах `Section`, `Paragraph`, `List` чи `RenderEventPublisher`.
