// import { pop } from 'core-js/core/array';
import { initialCards } from './cards.js';
import './pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNew = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const caption = popupImage.querySelector('.popup__caption');
const image = popupImage.querySelector(".popup__image");
const popupClose = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const formNewCard = popupNew.querySelector('.popup__form[name="new-place"]');
const cardNameInput = formNewCard.querySelector('.popup__input[name="place-name"]');
const cardLinkInput = formNewCard.querySelector('.popup__input[name="link"]');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(popupEdit);
}

function fillFormWithCurrentValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const cardElement = createCard({ name: cardName, link: cardLink }, deleteCard, toggleLike, openImage);
  cardsContainer.prepend(cardElement);

  closePopup(popupNew);
  formNewCard.reset();
}

formNewCard.addEventListener('submit', handleNewCardSubmit);

// @todo: Функция создания карточки
function createCard(cardData, deleteCard, toggleLike, openImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardImage.addEventListener('click', openImage);

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', toggleLike);

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;  
}

// Функция переключения лайка
function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove(); 
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard, toggleLike, openImage);
  cardsContainer.append(cardElement); 
});

// Функция откртия модального окна
function openPopup(popup) {
  popup.classList.add('popup_is-animated'); 
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 0); 
  document.addEventListener('keydown', closeOnEsc);
};

// Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 600);
  document.removeEventListener('keydown', closeOnEsc);
};

editButton.addEventListener('click', () => {
  fillFormWithCurrentValues();
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  openPopup(popupNew);
});

popupClose.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
});

function closeOnEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// Функция открытия изображения в модальном окне
function openImage(evt) {
  const place = evt.currentTarget.closest(".card");
  const cardImage = place.querySelector(".card__image");
  const cardTitle = place.querySelector(".card__title");

  caption.textContent = cardTitle.textContent;
  image.src = cardImage.src;
  image.alt = cardTitle.alt;

  openPopup(popupImage);
}
