// Данные о пиццах и размерах
const pizzaData = {
  'Пепперони': { basePrice: 399, baseCal: 600 },
  'Маргарита': { basePrice: 349, baseCal: 500 },
  'Баварская': { basePrice: 449, baseCal: 700 }
};

const sizeData = {
  'small': { priceModifier: 0, calModifier: 0, name: 'Маленькая (25см)' },
  'large': { priceModifier: 200, calModifier: 150, name: 'Большая (35см)' }
};

const addonsData = {
  'сырный борт': { price: 189, cal: 50 },
  'сливочная моцарелла': { price: 99, cal: 20 },
  'чедер и пармезан': { price: 99, cal: 20 }
};

// Состояние приложения
let state = {
  selectedPizza: null,
  selectedSize: 'small',
  selectedAddons: [],
  cartItems: []
};

// Элементы DOM
const DOM = {
  pizzaCards: document.querySelectorAll('.pizza-card'),
  sizeOptions: document.querySelectorAll('.size-option'),
  addonCards: document.querySelectorAll('.addon-card'),
  totalPrice: document.querySelector('.total-price'),
  calories: document.querySelector('.calories'),
  addToCartBtn: document.querySelector('.add-to-cart'),
  cartIndicator: document.querySelector('.cart-indicator')
};

// Обновление интерфейса
const updateUI = () => {
  if (!state.selectedPizza) {
    DOM.totalPrice.textContent = 'Выберите пиццу';
    DOM.calories.textContent = '';
    DOM.addToCartBtn.disabled = true;
    return;
  }

  const pizza = pizzaData[state.selectedPizza];
  const size = sizeData[state.selectedSize];
  
  let totalPrice = pizza.basePrice + size.priceModifier;
  let totalCal = pizza.baseCal + size.calModifier;

  // Добавляем допы (теперь с проверкой)
  state.selectedAddons.forEach(addonName => {
    if (addonsData[addonName]) {
      totalPrice += addonsData[addonName].price;
      totalCal += addonsData[addonName].cal;
    }
  });

  DOM.totalPrice.textContent = `Итого: ${totalPrice}₽`;
  DOM.calories.textContent = `~${totalCal} Ккал`;
  DOM.addToCartBtn.disabled = false;
  DOM.cartIndicator.textContent = `Корзина (${state.cartItems.length})`;
};

// Обработчики событий
const setupEventListeners = () => {
  // Выбор пиццы
  DOM.pizzaCards.forEach(card => {
    card.addEventListener('click', () => {
      // Удаляем выделение у всех пицц
      DOM.pizzaCards.forEach(c => c.classList.remove('selected'));
      
      // Добавляем выделение текущей
      card.classList.add('selected');
      
      // Обновляем состояние
      state.selectedPizza = card.dataset.type;
      
      // Обновляем UI
      updateUI();
    });
  });

  // Выбор размера
  DOM.sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Удаляем активный класс у всех вариантов
      DOM.sizeOptions.forEach(opt => opt.classList.remove('active'));
      
      // Добавляем активный класс текущему
      option.classList.add('active');
      
      // Обновляем состояние
      state.selectedSize = option.dataset.size;
      
      // Обновляем UI
      updateUI();
    });
  });

  // Выбор добавок
  // Выбор добавок
  DOM.addonCards.forEach(card => {
    card.addEventListener('click', () => {
      // Переключаем класс selected
      card.classList.toggle('selected');
      
      const addonName = card.dataset.addon;
      
      // Обновляем массив выбранных добавок
      if (card.classList.contains('selected')) {
        if (!state.selectedAddons.includes(addonName)) {
          state.selectedAddons.push(addonName);
        }
      } else {
        state.selectedAddons = state.selectedAddons.filter(name => name !== addonName);
      }
      
      // Обновляем UI
      updateUI();
    });
  });

  // Добавление в корзину
  DOM.addToCartBtn.addEventListener('click', () => {
    if (!state.selectedPizza) return;
    
    // Создаем объект заказа
    const orderItem = {
      pizza: state.selectedPizza,
      size: state.selectedSize,
      addons: [...state.selectedAddons],
      price: parseInt(DOM.totalPrice.textContent.match(/\d+/)[0]),
      calories: parseInt(DOM.calories.textContent.match(/\d+/)[0]),
      timestamp: new Date().getTime()
    };
    
    // Добавляем в корзину
    state.cartItems.push(orderItem);
    
    // Сбрасываем выбор (кроме размера)
    DOM.pizzaCards.forEach(c => c.classList.remove('selected'));
    DOM.addonCards.forEach(c => c.classList.remove('selected'));
    
    state.selectedPizza = null;
    state.selectedAddons = [];
    
    // Обновляем UI
    updateUI();
    
    // Показываем уведомление
    alert(`Пицца "${orderItem.pizza}" добавлена в корзину!`);
  });
};

// Инициализация приложения
const init = () => {
  // Устанавливаем обработчики событий
  setupEventListeners();
  
  // Активируем размер по умолчанию
  document.querySelector(`.size-option[data-size="${state.selectedSize}"]`).classList.add('active');
  
  // Первоначальное обновление UI
  updateUI();
};

// Запускаем приложение
document.addEventListener('DOMContentLoaded', init);