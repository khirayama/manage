import { keyCodes } from '../constants/constants';


function stringToElement(template) {
  const container = document.createElement('div');

  container.innerHTML = template;

  return container;
}

export const ConfirmDialog = {
  constructor: (message, resolve, reject) => {
    const template = ConfirmDialog.template(message);

    ConfirmDialog.resolve = resolve;
    ConfirmDialog.reject = reject;

    ConfirmDialog._container = document.querySelector('body');
    ConfirmDialog._element = stringToElement(template);
    ConfirmDialog._background =
      ConfirmDialog._element.querySelector('.confirm-dialog-background');
    ConfirmDialog._cancelButton =
      ConfirmDialog._element.querySelector('.confirm-dialog-cancel-button');
    ConfirmDialog._acceptButton =
      ConfirmDialog._element.querySelector('.confirm-dialog-accept-button');
    ConfirmDialog._interruptInput =
      ConfirmDialog._element.querySelector('.confirm-dialog-interrupt-input');

    ConfirmDialog.setEventHandlers();
    ConfirmDialog.show();
  },
  setEventHandlers: () => {
    ConfirmDialog._cancelButton.addEventListener('click', (event) => {
      event.stopPropagation();
      ConfirmDialog.cancel();
      ConfirmDialog.hide();
    });

    ConfirmDialog._background.addEventListener('click', (event) => {
      event.stopPropagation();
      ConfirmDialog.cancel();
      ConfirmDialog.hide();
    });

    ConfirmDialog._acceptButton.addEventListener('click', (event) => {
      event.stopPropagation();
      ConfirmDialog.accept();
      ConfirmDialog.hide();
    });

    // stop keybord input
    ConfirmDialog._interruptInput.addEventListener('keydown', (event) => {
      event.stopPropagation();
    });

    ConfirmDialog._interruptInput.addEventListener('keypress', (event) => {
      event.stopPropagation();
    });

    ConfirmDialog._interruptInput.addEventListener('keyup', (event) => {
      event.stopPropagation();
      const keyCode = event.keyCode;
      const shift = event.shiftKey;
      const ctrl = event.ctrlKey || event.metaKey;

      switch (true) {
        case (keyCode === keyCodes.ENTER && !shift && !ctrl):
          ConfirmDialog.accept();
          ConfirmDialog.hide();
          break;
        case (keyCode === keyCodes.ESC && !shift && !ctrl):
          ConfirmDialog.cancel();
          ConfirmDialog.hide();
          break;
        default:
          break;
      }
    });
  },
  accept: () => {
    ConfirmDialog.resolve();
  },
  cancel: () => {
    ConfirmDialog.reject();
  },
  show: () => {
    ConfirmDialog._container.appendChild(ConfirmDialog._element);
    ConfirmDialog._interruptInput.focus();
  },
  hide: () => {
    ConfirmDialog._container.removeChild(ConfirmDialog._element);
  },
  template: message => (`
    <div class="confirm-dialog-background">
      <input class="confirm-dialog-interrupt-input" type="text" />
      <div class="confirm-dialog">
        <div class="confirm-dialog-message">${message}</div>
        <div class="confirm-dialog-buttons-container">
          <div class="confirm-dialog-button confirm-dialog-cancel-button">Cancel</div>
          <div class="confirm-dialog-button confirm-dialog-accept-button confirm-dialog-button__selected">OK</div>
        </div>
      </div>
    </div>
  `),
};

export default function promiseConfirm(message) {
  return new Promise((resolve, reject) => {
    ConfirmDialog.constructor(message, resolve, reject);
  });
}
