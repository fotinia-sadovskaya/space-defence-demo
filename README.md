space-defence/
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── images/
│   │   │   └── (спрайти, логотипи, вибухи, кораблі)
│   │   ├── sounds/
│   │   │   ├── buy.wav
│   │   │   └── toggle.wav
│   │   └── styles/
│   │       └── styles.css
│   ├── partials/
│   │   ├── ui-hud.partial.html
│   │   ├── ui-store.partial.html
│   │   └── ui-profile.partial.html
│   ├── js/
│   │   ├── main.js               # Основна логіка
│   │   ├── player.js             # Клас Player
│   │   ├── bullet.js             # Клас Bullet
│   │   ├── enemy.js              # Клас Enemy
│   │   ├── asteroid.js           # Клас Asteroid
│   │   ├── ui.js                 # Взаємодія з інтерфейсом
│   │   ├── store.js              # Магазин
│   │   └── profile.js            # Профіль гравця
│   └── utils/
│       ├── score.js              # Сховище очок та highscore
│       ├── notify.js             # Toast-повідомлення
│       └── sound.js              # Звукові ефекти
├── server/
│   └── server.js                 # Сервер WebSocket (якщо треба)
├── package.json                  # Залежності Node.js
└── README.md                     # Документація до гри

