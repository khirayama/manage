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
  },
  accept: () => {
    ConfirmDialog.resolve();
  },
  cancel: () => {
    ConfirmDialog.reject();
  },
  show: () => {
    ConfirmDialog._container.appendChild(ConfirmDialog._element);
  },
  hide: () => {
    ConfirmDialog._container.removeChild(ConfirmDialog._element);
  },
  template: (message) => {
    return `
      <div class="confirm-dialog-background">
        <div class="confirm-dialog">
          <div class="confirm-dialog-message">${message}</div>
          <div class="confirm-dialog-buttons-container">
            <div class="confirm-dialog-cancel-button">Cancel</div>
            <div class="confirm-dialog-accept-button">OK</div>
          </div>
        </div>
      </div>
    `;
  },
};

export default function promiseConfirm(message) {
  return new Promise((resolve, reject) => {
    ConfirmDialog.constructor(message, resolve, reject);
  });
}
