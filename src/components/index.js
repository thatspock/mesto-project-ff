import { createCard, toggleLike, deleteCard } from './card.js';
import { openModal, closeModal, closePopupByOverlay } from './modal.js';
import '../pages/index.css';
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, updateAvatar } from './api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNew = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupCloses = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup_type_image');
const caption = popupImage.querySelector('.popup__caption');
const image = popupImage.querySelector(".popup__image");

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const avatarForm = document.querySelector('form[name="edit-avatar"]');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarInput = document.querySelector('.popup__input_type_avatar-link');

const newCardForm = popupNew.querySelector('form[name="new-place"]');
const newCardNameInput = newCardForm.querySelector('.popup__input[name="place-name"]');
const newCardLinkInput = newCardForm.querySelector('.popup__input[name="link"]');

let userId;

// Функция изменения текста кнопки
function renderLoading(isLoading, buttonElement, initialText) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = initialText;
    buttonElement.disabled = false;
  }
}

// Обработчик «отправки» формы
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  
  renderLoading(true, submitButton, initialText);

  const avatarUrl = avatarInput.value;

  updateAvatar(avatarUrl)
    .then((userInfo) => {
      profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  
  renderLoading(true, submitButton, initialText);

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  updateUserInfo(nameValue, jobValue)
    .then((userInfo) => {
      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

function fillProfileFormWithCurrentValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  
  renderLoading(true, submitButton, initialText);

  const cardName = newCardNameInput.value;
  const cardLink = newCardLinkInput.value;
  
  addCard(cardName, cardLink)
  .then((newCard) => {
    const cardElement = createCard(newCard, deleteCard, toggleLike, openImage);
    cardsContainer.prepend(cardElement);
    closeModal(popupNew);
    newCardForm.reset();
    clearValidation(newCardForm, validationConfig); // Передача validationConfig
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    renderLoading(false, submitButton, initialText);
  });
}

// Функция открытия изображения в модальном окне
function openImage(link, name) {
  caption.textContent = name;
  image.src = link;
  image.alt = name;

  openModal(popupImage);
}

// Прикрепляем обработчик к форме
profileForm.addEventListener('submit', handleProfileFormSubmit); 
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

editButton.addEventListener('click', () => {
  fillProfileFormWithCurrentValues();
  clearValidation(profileForm, validationConfig);
  openModal(popupEdit);
});

addButton.addEventListener('click', () => {
  clearValidation(newCardForm, validationConfig); 
  newCardForm.reset();
  openModal(popupNew);
});

// Добавление обработчика для кнопки редактирования аватара:
avatarEditButton.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);
  openModal(popupEditAvatar);
});

popupCloses.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

popups.forEach(popup => {
  closePopupByOverlay(popup);
});

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    // Обновление профиля пользователя
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    userId = userInfo._id;

    // Отображение карточек
    cards.forEach(card => {
      const cardElement = createCard(card, deleteCard, toggleLike, openImage, userId);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });
