import { initialCards } from './initialCards.js';
import { createCard, toggleLike, deleteCard } from './card.js';
import { openModal, closeModal, closePopupByOverlay } from './modal.js';
import '../pages/index.css';

const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNew = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupClose = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup_type_image');
const caption = popupImage.querySelector('.popup__caption');
const image = popupImage.querySelector(".popup__image");

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const newCardForm = popupNew.querySelector('form[name="new-place"]');
const newCardNameInput = newCardForm.querySelector('.popup__input[name="place-name"]');
const newCardLinkInput = newCardForm.querySelector('.popup__input[name="link"]');

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(popupEdit);
}

function fillProfileFormWithCurrentValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// Прикрепляем обработчик к форме
profileForm.addEventListener('submit', handleProfileFormSubmit); 

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = newCardNameInput.value;
  const cardLink = newCardLinkInput.value;

  const cardElement = createCard({ name: cardName, link: cardLink }, deleteCard, toggleLike, openImage);
  cardsContainer.prepend(cardElement);

  closeModal(popupNew);
  newCardForm.reset();
}

// Функция открытия изображения в модальном окне
function openImage(evt) {
  const place = evt.currentTarget.closest(".card");
  const cardImage = place.querySelector(".card__image");
  const cardTitle = place.querySelector(".card__title");

  caption.textContent = cardTitle.textContent;
  image.src = cardImage.src;
  image.alt = cardTitle.alt;

  openModal(popupImage);
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// Вывести карточки на страницу
initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard, toggleLike, openImage);
  cardsContainer.append(cardElement); 
});

editButton.addEventListener('click', () => {
  fillProfileFormWithCurrentValues();
  openModal(popupEdit);
});

addButton.addEventListener('click', () => {
  openModal(popupNew);
});

popupClose.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

popups.forEach(popup => {
  closePopupByOverlay(popup);
});
