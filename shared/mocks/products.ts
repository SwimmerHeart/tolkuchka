import type { Category, Product } from '../schemas/product.schema';

import imgElectronics1 from './images/electronics-small-1.jpg';
import imgElectronics2 from './images/electronics-small-2.jpg';
import imgElectronics3 from './images/electronics-small-3.jpg';
import imgElectronics4 from './images/electronics-small-4.jpg';
import imgElectronics5 from './images/electronics-small-5.jpg';
import imgElectronics6 from './images/electronics-small-6.jpg';
import imgHome1 from './images/home-small-1.jpg';
import imgHome2 from './images/home-small-2.jpg';
import imgHome3 from './images/home-small-3.jpg';
import imgHome4 from './images/home-small-4.jpg';
import imgHome5 from './images/home-small-5.jpg';
import imgHome6 from './images/home-small-6.jpg';
import imgClothing1 from './images/clothing-small-1.jpg';
import imgClothing2 from './images/clothing-small-2.jpg';
import imgClothing3 from './images/clothing-small-3.jpg';
import imgClothing4 from './images/clothing-small-4.jpg';
import imgClothing5 from './images/clothing-small-5.jpg';
import imgClothing6 from './images/clothing-small-6.jpg';
import imgSport1 from './images/sport-small-1.jpg';
import imgSport2 from './images/sport-small-2.jpg';
import imgSport3 from './images/sport-small-3.jpg';
import imgSport4 from './images/sport-small-4.jpg';
import imgSport5 from './images/sport-small-5.jpg';
import imgSport6 from './images/sport-small-6.jpg';
import imgBooks1 from './images/books-small-1.jpg';
import imgBooks2 from './images/books-small-2.jpg';
import imgBooks3 from './images/books-small-3.jpg';
import imgBooks4 from './images/books-small-4.jpg';
import imgBooks5 from './images/books-small-5.jpg';
import imgBooks6 from './images/books-small-6.jpg';
import imgToys1 from './images/toys-small-1.jpg';
import imgToys2 from './images/toys-small-2.jpg';
import imgToys3 from './images/toys-small-3.jpg';
import imgToys4 from './images/toys-small-4.jpg';
import imgToys5 from './images/toys-small-5.jpg';
import imgToys6 from './images/toys-small-6.jpg';

const electronics: Category = { id: 'cat-electronics', slug: 'electronics', name: 'Электроника' };
const home: Category = { id: 'cat-home', slug: 'home', name: 'Дом и кухня' };
const clothing: Category = { id: 'cat-clothing', slug: 'clothing', name: 'Одежда' };
const sport: Category = { id: 'cat-sport', slug: 'sport', name: 'Спорт' };
const books: Category = { id: 'cat-books', slug: 'books', name: 'Книги' };
const toys: Category = { id: 'cat-toys', slug: 'toys', name: 'Игрушки' };

export const categories: Category[] = [electronics, home, clothing, sport, books, toys];

export const products: Product[] = [
  // Электроника
  {
    id: 'p-1',
    slug: 'electronics-1',
    name: 'Наушники беспроводные AeroSound',
    description: 'Надёжный беспроводной звук, до 24 часов работы и шумоподавление.',
    price: 4990,
    oldPrice: 7490,
    imageUrl: imgElectronics1,
    rating: 3.7,
    category: electronics,
  },
  {
    id: 'p-2',
    slug: 'electronics-2',
    name: 'Умная колонка «Сфера»',
    description: 'Компактная колонка с голосовым ассистентом и многокомнатной музыкой.',
    price: 3990,
    oldPrice: 4990,
    imageUrl: imgElectronics2,
    rating: 4.5,
    category: electronics,
  },
  {
    id: 'p-3',
    slug: 'electronics-3',
    name: 'Смарт-часы PulseFit',
    description: 'Трекер активности, пульс и уведомления от смартфона на экране AMOLED.',
    price: 8990,
    imageUrl: imgElectronics3,
    rating: 4.8,
    category: electronics,
  },
  {
    id: 'p-4',
    slug: 'electronics-4',
    name: 'Внешний SSD 1 ТБ',
    description: 'Портативный накопитель со скоростью до 1050 МБ/с и влагозащитой.',
    price: 6490,
    imageUrl: imgElectronics4,
    rating: 4.6,
    category: electronics,
  },
  {
    id: 'p-5',
    slug: 'electronics-5',
    name: 'Клавиатура механическая',
    description: 'Тихие переключатели, подсветка и сменные кейкапы в комплекте.',
    price: 5490,
    oldPrice: 6990,
    imageUrl: imgElectronics5,
    rating: 4.6,
    category: electronics,
  },
  {
    id: 'p-6',
    slug: 'electronics-6',
    name: 'Чайник электрический стильный',
    description: 'Быстрый нагрев, регулировка температуры и автоотключение.',
    price: 3490,
    imageUrl: imgElectronics6,
    rating: 4.5,
    category: electronics,
  },

  // Дом и кухня
  {
    id: 'p-7',
    slug: 'home-1',
    name: 'Чайный сервиз керамический, 12 предметов',
    description: 'Покрытие создано для ежедневного использования и посудомойки.',
    price: 2890,
    imageUrl: imgHome1,
    rating: 4.7,
    category: home,
  },
  {
    id: 'p-8',
    slug: 'home-2',
    name: 'Сковорода с антипригарным покрытием 28 см',
    description: 'Индукционная дно, без масла и без прилипания.',
    price: 2490,
    oldPrice: 3290,
    imageUrl: imgHome2,
    rating: 4.5,
    category: home,
  },
  {
    id: 'p-9',
    slug: 'home-3',
    name: 'Кофеварка капельная',
    description: 'Готовит до 12 чашек и поддерживает температуру в течение часа.',
    price: 5990,
    imageUrl: imgHome3,
    rating: 4.6,
    category: home,
  },
  {
    id: 'p-10',
    slug: 'home-4',
    name: 'Постельное бельё, сатин, комплект',
    description: 'Плотный хлопок с мягким шелковистым блеском.',
    price: 3990,
    oldPrice: 4990,
    imageUrl: imgHome4,
    rating: 4.8,
    category: home,
  },
  {
    id: 'p-11',
    slug: 'home-5',
    name: 'Подушка ортопедическая',
    description: 'Анатомическая форма поддерживает шею во время сна.',
    price: 1790,
    oldPrice: 2390,
    imageUrl: imgHome5,
    rating: 4.4,
    category: home,
  },
  {
    id: 'p-12',
    slug: 'home-6',
    name: 'Хлебопечка',
    description: 'Выпекает 8 программ: от белого хлеба до безглютенового.',
    price: 9990,
    imageUrl: imgHome6,
    rating: 4.6,
    category: home,
  },

  // Одежда
  {
    id: 'p-13',
    slug: 'clothing-1',
    name: 'Пуховик зимний',
    description: 'Тёплый пуховый наполнитель и водонепроницаемая мембрана.',
    price: 12990,
    oldPrice: 16990,
    imageUrl: imgClothing1,
    rating: 4.8,
    category: clothing,
  },
  {
    id: 'p-14',
    slug: 'clothing-2',
    name: 'Свитер из мериноса',
    description: 'Мягкая шерсть без колкости для повседневной носки.',
    price: 3990,
    imageUrl: imgClothing2,
    rating: 4.5,
    category: clothing,
  },
  {
    id: 'p-15',
    slug: 'clothing-3',
    name: 'Джинсы классического кроя',
    description: 'Плотный деним, посадка средней высоты.',
    price: 2990,
    oldPrice: 3990,
    imageUrl: imgClothing3,
    rating: 4.4,
    category: clothing,
  },
  {
    id: 'p-16',
    slug: 'clothing-4',
    name: 'Комплект термобелья',
    description: 'Отводит влагу и сохраняет тепло до —20 °C.',
    price: 2490,
    imageUrl: imgClothing4,
    rating: 4.6,
    category: clothing,
  },
  {
    id: 'p-17',
    slug: 'clothing-5',
    name: 'Кроссовки городские',
    description: 'Лёгкая подошва и дышащий верх для долгих прогулок.',
    price: 5490,
    imageUrl: imgClothing5,
    rating: 4.3,
    category: clothing,
  },
  {
    id: 'p-18',
    slug: 'clothing-6',
    name: 'Дождевик складной',
    description: 'Компактный в сложенном виде, умещается в карман.',
    price: 990,
    imageUrl: imgClothing6,
    rating: 4.2,
    category: clothing,
  },

  // Спорт
  {
    id: 'p-19',
    slug: 'sport-1',
    name: 'Гантели разборные 2×10 кг',
    description: 'Компактно заменяют полноценный набор весов для дома.',
    price: 4990,
    oldPrice: 5990,
    imageUrl: imgSport1,
    rating: 4.7,
    category: sport,
  },
  {
    id: 'p-20',
    slug: 'sport-2',
    name: 'Коврик для йоги',
    description: 'Толщина 6 мм, нескользящее покрытие обеих сторон.',
    price: 1490,
    imageUrl: imgSport2,
    rating: 4.5,
    category: sport,
  },
  {
    id: 'p-21',
    slug: 'sport-3',
    name: 'Велоэргометр домашний',
    description: 'Магнитная нагрузка и датчик пульса на рукоятках.',
    price: 35990,
    imageUrl: imgSport3,
    rating: 4.6,
    category: sport,
  },
  {
    id: 'p-22',
    slug: 'sport-4',
    name: 'Мяч футбольный',
    description: 'Влагостойкая поверхность и усиленные швы.',
    price: 1990,
    imageUrl: imgSport4,
    rating: 4.4,
    category: sport,
  },
  {
    id: 'p-23',
    slug: 'sport-5',
    name: 'Беговой рюкзак с гидратором',
    description: 'Лёгкий, с мягкой ёмкостью для воды на 1.5 литра.',
    price: 2490,
    oldPrice: 2990,
    imageUrl: imgSport5,
    rating: 4.5,
    category: sport,
  },
  {
    id: 'p-24',
    slug: 'sport-6',
    name: 'Эспандер-тяга',
    description: 'Регулируемая нагрузка для разминки и укрепления мышц.',
    price: 890,
    imageUrl: imgSport6,
    rating: 4.3,
    category: sport,
  },

  // Книги
  {
    id: 'p-25',
    slug: 'books-1',
    name: '«Тихий город» — роман',
    description: 'История о соседях, которые знали друг о друге слишком много.',
    price: 690,
    oldPrice: 890,
    imageUrl: imgBooks1,
    rating: 4.6,
    category: books,
  },
  {
    id: 'p-26',
    slug: 'books-2',
    name: '«Алгоритмы: теория и практика»',
    description: 'Современный учебник с примерами на реальных кейсах.',
    price: 1990,
    oldPrice: 2490,
    imageUrl: imgBooks2,
    rating: 4.8,
    category: books,
  },
  {
    id: 'p-27',
    slug: 'books-3',
    name: '«Садоводство на балконе»',
    description: 'Как вырастить зелень и томаты в городской квартире.',
    price: 990,
    imageUrl: imgBooks3,
    rating: 4.4,
    category: books,
  },
  {
    id: 'p-28',
    slug: 'books-4',
    name: '«Маленький принц» (с иллюстрациями)',
    description: 'Классика в подарочном оформлении с авторскими рисунками.',
    price: 790,
    imageUrl: imgBooks4,
    rating: 4.9,
    category: books,
  },
  {
    id: 'p-29',
    slug: 'books-5',
    name: '«Кулинарная книга пекаря»',
    description: '40 проверенных рецептов от закваски до круассанов.',
    price: 1290,
    imageUrl: imgBooks5,
    rating: 4.5,
    category: books,
  },
  {
    id: 'p-30',
    slug: 'books-6',
    name: 'Графический роман «Город теней»',
    description: 'Неоновый детектив в твёрдом переплёте.',
    price: 1590,
    imageUrl: imgBooks6,
    rating: 4.7,
    category: books,
  },

  // Игрушки
  {
    id: 'p-31',
    slug: 'toys-1',
    name: 'Конструктор «Космодром», 1200 деталей',
    description: 'Собирается в стартовый комплекс с подвижными элементами.',
    price: 4990,
    oldPrice: 5990,
    imageUrl: imgToys1,
    rating: 4.8,
    category: toys,
  },
  {
    id: 'p-32',
    slug: 'toys-2',
    name: 'Мягкая игрушка панда',
    description: 'Приятный на ощупь гипоаллергенный материал.',
    price: 1490,
    imageUrl: imgToys2,
    rating: 4.9,
    category: toys,
  },
  {
    id: 'p-33',
    slug: 'toys-3',
    name: 'Настольная игра «Шестое чувство»',
    description: 'Логическая игра для 2–6 игроков от 8 лет.',
    price: 2490,
    oldPrice: 2990,
    imageUrl: imgToys3,
    rating: 4.6,
    category: toys,
  },
  {
    id: 'p-34',
    slug: 'toys-4',
    name: 'Железная дорога с мостом',
    description: 'Набор из 60 деталей с локомотивом на батарейках.',
    price: 6990,
    imageUrl: imgToys4,
    rating: 4.5,
    category: toys,
  },
  {
    id: 'p-35',
    slug: 'toys-5',
    name: 'Набор для опытов «Юный химик»',
    description: '15 безопасных экспериментов с инструкцией для детей.',
    price: 1890,
    imageUrl: imgToys5,
    rating: 4.4,
    category: toys,
  },
  {
    id: 'p-36',
    slug: 'toys-6',
    name: 'Планшет для рисования без экрана',
    description: 'Рисунок стирается нажатием кнопки — бесконечный холст.',
    price: 3490,
    imageUrl: imgToys6,
    rating: 4.3,
    category: toys,
  },
];
