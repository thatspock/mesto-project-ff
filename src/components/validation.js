const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// const isValid = (formElement, inputElement, settings) => {
//   if (!inputElement.validity.valid) {
//     let errorMessage = inputElement.validationMessage;
//     if (inputElement.validity.patternMismatch) {
//       errorMessage = inputElement.dataset.errorMessage;
//     }
//     showInputError(formElement, inputElement, errorMessage, settings);
//   } else {
//     hideInputError(formElement, inputElement, settings);
//   }
// };

const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.validationMessage;
    if (inputElement.validity.valueMissing) {
      errorMessage = 'Это поле обязательно для заполнения.';
    } else if (inputElement.validity.tooShort) {
      errorMessage = `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length}.`;
    } else if (inputElement.validity.tooLong) {
      errorMessage = `Максимальное количество символов: ${inputElement.maxLength}. Длина текста сейчас: ${inputElement.value.length}.`;
    } else if (inputElement.validity.patternMismatch) {
      errorMessage = inputElement.dataset.errorMessage;
    }
    showInputError(formElement, inputElement, errorMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach(inputElement => hideInputError(formElement, inputElement, settings));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
};

export { enableValidation, clearValidation };
