import { likeCard, unlikeCard } from './api.js';

// Функция создания карточки
export function createCard(cardData, deleteCard, toggleLike, openImage, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const likeCount = cardElement.querySelector('.card__like-count');
  likeCount.textContent = cardData.likes.length;

  cardImage.addEventListener('click', openImage);

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', (evt) => toggleLike(evt, cardData, likeCount));

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  if (cardData.owner._id === userId) {
    cardDeleteButton.addEventListener('click', () => deleteCard(cardData._id, cardElement));
  } else {
    cardDeleteButton.style.display = 'none';
  }

  return cardElement;  
}

// Функция переключения лайка
export function toggleLike(evt, cardData, likeCount) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    unlikeCard(cardData._id)
      .then((updatedCard) => {
        likeCount.textContent = updatedCard.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    likeCard(cardData._id)
      .then((updatedCard) => {
        likeCount.textContent = updatedCard.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.error(err);
      });
    }
}

// Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd5d084e6-7ab4-435f-846f-dd03cae80573'
    }
  })
  .then((res) => {
    if (res.ok) {
      cardElement.remove();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .catch((err) => {
    console.error(err);
  });
}
