import { encodeWasm } from './to-base64-wasm';
import { encode } from "./to-base64";

const encodeBase64UseVanilla = (image: HTMLImageElement): void => {
  console.log('run "vanilla" 🏃‍♂️');
  const t0 = performance.now();
  console.log(encode(image));
  var t1 = performance.now();
  console.log(`⏳"vanilla" processing time ${(t1 - t0)} milliseconds.`);
}

const encodeBase64UseWasm = (image: HTMLImageElement): void => {
  encodeWasm()
    .then(({ run }) => {
      console.log('run "wasm" 🏃‍♂️');
      const t0 = performance.now();
      console.log(run(image));
      var t1 = performance.now();
      console.log(`⏳"wasm" processing time ${(t1 - t0)} milliseconds.`);
    })
    .catch(error => console.error(error));
}

const onClickButton = (target: HTMLButtonElement): void => {
  const targetImage = document.querySelector<HTMLImageElement>(`img#${target.getAttribute('aria-controls')}`);

  if (!targetImage) {
    console.error('target image element not found...😩');
    return;
  }

  const type = target.dataset.encodeType;

  switch (true) {
    case type === "wasm":
      encodeBase64UseWasm(targetImage);
      break;
    case type === "vanilla":
      encodeBase64UseVanilla(targetImage);
      break;
    default:
      console.error("type is undefined...😩");
      break;
  }
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