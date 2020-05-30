import { runWasm } from './wasm';

const encodeBase64 = (image: HTMLImageElement): void => {
  runWasm()
    .then(({ run }) => {
      if (image instanceof HTMLImageElement) {
        const t0 = performance.now();
        console.log(run(image));
        var t1 = performance.now();
        console.log(`⏳ processing time ${(t1 - t0)} milliseconds.`);
      } else {
        console.error('image is not HTMLImageElement');
      }
    })
    .catch(error => console.error(error));
}

const onClickButton = (target: HTMLButtonElement): void => {
  const targetImage = document.querySelector<HTMLImageElement>(`img#${target.getAttribute('aria-controls')}`);

  if (!targetImage) {
    console.error('target image element not found...😩');
    return;
  }

  encodeBase64(targetImage);
}

const onClick = ({ target }: MouseEvent): void => {
  if (!(target instanceof HTMLElement))
    return;

  const button = target.matches('button[aria-controls]')
    ? target as HTMLButtonElement
    : target.closest<HTMLButtonElement>('button[aria-controls]');

  if (button)
    onClickButton(button);
}

const eventHandler = (event: Event) => {
  if (event.type === 'click') {
    onClick(event as MouseEvent);
  }
}

const addListener = (): void => {
  document.body.addEventListener('click', eventHandler);
}

const run = (): void => {
  addListener();
}

document.addEventListener('DOMContentLoaded', run);