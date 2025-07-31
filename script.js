class ColorPaletteSite {
  constructor() {
    this.body = document.body;
    this.colorButtons = document.querySelectorAll(".color-btn");
    this.casesBtn = document.getElementById("casesBtn");
    this.miniGamesBtn = document.getElementById("miniGamesBtn");
    this.spinningOverlay = document.getElementById("spinningOverlay");
    this.closeBtn = document.getElementById("closeBtn");

    this.init();
  }

  init() {
    this.bindColorButtons();
    this.bindFooterButtons();
    this.bindCloseButton();
  }

  bindColorButtons() {
    this.colorButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.changeTheme(e.target);
      });
    });
  }

  bindFooterButtons() {
    this.casesBtn.addEventListener("click", () => {
      this.showSpinningAnimation();
    });

    this.miniGamesBtn.addEventListener("click", () => {
      this.showMessage("Мини игры скоро будут добавлены!");
    });
  }

  bindCloseButton() {
    this.closeBtn.addEventListener("click", () => {
      this.hideSpinningAnimation();
    });

    // Закрытие по клику на фон
    this.spinningOverlay.addEventListener("click", (e) => {
      if (e.target === this.spinningOverlay) {
        this.hideSpinningAnimation();
      }
    });

    // Закрытие по Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.spinningOverlay.style.display === "flex") {
        this.hideSpinningAnimation();
      }
    });
  }

  changeTheme(button) {
    const bgColor = button.dataset.bg;
    const textColor = button.dataset.text;

    // Добавляем эффект ripple
    this.createRippleEffect(button);

    // Плавно меняем цвета
    this.body.style.backgroundColor = bgColor;
    this.body.style.color = textColor;

    // Добавляем feedback пользователю
    this.showMessage(`Тема изменена на ${bgColor}`);
  }

  createRippleEffect(button) {
    button.style.transform = "scale(1.2)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 200);
  }

  showSpinningAnimation() {
    this.spinningOverlay.style.display = "flex";

    // Генерируем элементы рулетки
    this.generateRouletteItems();

    // Сброс анимации и элементов
    const rouletteTrack = document.getElementById("rouletteTrack");
    const closeBtn = this.closeBtn;
    const winnerDisplay = document.getElementById("winnerDisplay");

    // Сбрасываем классы и устанавливаем начальную позицию
    rouletteTrack.classList.remove("spinning");
    rouletteTrack.style.transform = "translateX(100%)";

    // Запускаем анимацию рулетки
    setTimeout(() => {
      rouletteTrack.classList.add("spinning");
    }, 50);

    // Показываем победителя после завершения анимации
    setTimeout(() => {
      this.showWinningItem();
    }, 5000);

    // Сброс кнопки закрытия
    closeBtn.style.opacity = "0";
    closeBtn.style.animation = "none";
    closeBtn.offsetHeight; // Trigger reflow
    closeBtn.style.animation = "showCloseBtn 0.5s ease 5s forwards";

    // Сброс дисплея победителя
    winnerDisplay.style.opacity = "0";
    winnerDisplay.style.animation = "none";
    winnerDisplay.offsetHeight; // Trigger reflow
  }

  showWinningItem() {
    const winnerDisplay = document.getElementById("winnerDisplay");
    const rouletteTrack = document.getElementById("rouletteTrack");

    // Вычисляем, какой элемент находится под указателем
    const containerCenter =
      this.spinningOverlay.querySelector(".roulette-container").offsetWidth / 2;
    const trackPosition = -1100; // Финальная позиция из анимации
    const itemWidth = 140; // 120px ширина + 20px отступы

    // Определяем индекс элемента под указателем
    const visibleItemIndex = Math.floor(
      (containerCenter - trackPosition) / itemWidth
    );
    const items = [
      "🎮",
      "🎯",
      "🎲",
      "🎪",
      "🎨",
      "🏆",
      "💎",
      "⭐",
      "🎊",
      "🎁",
      "🔥",
      "⚡",
    ];
    const winningItem = items[visibleItemIndex % items.length];

    // Показываем выигрышный элемент
    winnerDisplay.textContent = winningItem;
    winnerDisplay.style.animation = "showWinner 0.8s ease forwards";
  }

  generateRouletteItems() {
    const rouletteTrack = document.getElementById("rouletteTrack");
    const items = [
      "🎮",
      "🎯",
      "🎲",
      "🎪",
      "🎨",
      "🏆",
      "💎",
      "⭐",
      "🎊",
      "🎁",
      "🔥",
      "⚡",
    ];

    // Очищаем трек
    rouletteTrack.innerHTML = "";

    // Генерируем достаточно элементов для бесконечного цикла
    // Сначала создаем набор для показа справа (начальная позиция)
    for (let cycle = 0; cycle < 3; cycle++) {
      items.forEach((item, index) => {
        const rouletteItem = document.createElement("div");
        rouletteItem.className = "roulette-item";
        rouletteItem.textContent = item;

        // Добавляем небольшую задержку для shimmer эффекта
        rouletteItem.style.animationDelay = `${
          (cycle * items.length + index) * 0.1
        }s`;

        rouletteTrack.appendChild(rouletteItem);
      });
    }
  }

  hideSpinningAnimation() {
    this.spinningOverlay.style.display = "none";

    // Сбрасываем состояние для следующего запуска
    const rouletteTrack = document.getElementById("rouletteTrack");
    const winnerDisplay = document.getElementById("winnerDisplay");

    rouletteTrack.classList.remove("spinning");
    rouletteTrack.style.transform = "";
    winnerDisplay.style.animation = "none";
    winnerDisplay.style.opacity = "0";
  }

  showMessage(message) {
    // Создаем временное уведомление
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: rgba(0,0,0,0.8);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 25px;
                    z-index: 2000;
                    animation: slideIn 0.3s ease;
                    font-size: 14px;
                    max-width: 300px;
                    word-wrap: break-word;
                `;

    // Добавляем стили для анимации
    const style = document.createElement("style");
    style.textContent = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideIn 0.3s ease reverse";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 3000);
  }
}

// Инициализация приложения после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  new ColorPaletteSite();
});

// Дополнительные утилиты
class Utils {
  static getContrastColor(hexColor) {
    // Простой способ определения контрастного цвета
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  }

  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}
