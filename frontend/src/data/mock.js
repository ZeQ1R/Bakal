// Mock data for BAKAL : CUISINES Restaurant

export const images = {
  hero: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjByZXN0YXVyYW50fGVufDB8fHx8MTc2Nzc5NDY3MHww&ixlib=rb-4.1.0&q=85',
  interior: 'https://images.unsplash.com/photo-1687945512099-400cbe94460c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjByZXN0YXVyYW50fGVufDB8fHx8MTc2Nzc5NDY3MHww&ixlib=rb-4.1.0&q=85',
  ambiance: 'https://images.unsplash.com/photo-1621873495868-6c5774cf6012?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjByZXN0YXVyYW50fGVufDB8fHx8MTc2Nzc5NDY3MHww&ixlib=rb-4.1.0&q=85',
  chef: 'https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxmaW5lJTIwZGluaW5nfGVufDB8fHx8MTc2Nzc5NDY3Nnww&ixlib=rb-4.1.0&q=85',
  wellington: 'https://images.unsplash.com/photo-1611520175743-30ff00129621?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxmaW5lJTIwZGluaW5nfGVufDB8fHx8MTc2Nzc5NDY3Nnww&ixlib=rb-4.1.0&q=85',
  plating: 'https://images.unsplash.com/photo-1616671285410-2a676a9a433d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxmaW5lJTIwZGluaW5nfGVufDB8fHx8MTc2Nzc5NDY3Nnww&ixlib=rb-4.1.0&q=85',
  dish1: 'https://images.pexels.com/photos/995743/pexels-photo-995743.jpeg',
  dish2: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
};

export const culinarySignatures = [
  {
    id: 1,
    title: 'International Specialties',
    description: 'A curated journey through global flavors, from delicate Asian inspirations to bold Mediterranean traditions.',
    image: images.plating,
  },
  {
    id: 2,
    title: 'Premium Barbecue Selection',
    description: 'Fire-kissed perfection. Our master grill chefs craft each cut with precision and passion.',
    image: images.wellington,
  },
  {
    id: 3,
    title: 'European Classics',
    description: 'Timeless recipes reimagined with contemporary elegance and the finest seasonal ingredients.',
    image: images.dish1,
  },
  {
    id: 4,
    title: 'Eastern European Heritage',
    description: 'Authentic flavors from the heart of Europe, honoring generations of culinary tradition.',
    image: images.chef,
  },
];

export const menuItems = {
  lunch: [
    { id: 1, name: 'Grilled Sea Bass', description: 'Mediterranean herbs, lemon butter, seasonal vegetables', price: '$42', isVegan: false, isVegetarian: false },
    { id: 2, name: 'Wagyu Beef Tartare', description: 'Hand-cut wagyu, quail egg, truffle aioli, capers', price: '$38', isVegan: false, isVegetarian: false },
    { id: 3, name: 'Wild Mushroom Risotto', description: 'Arborio rice, porcini, black truffle shavings', price: '$34', isVegan: false, isVegetarian: true },
    { id: 4, name: 'Garden Vegetable Tasting', description: 'Seasonal vegetables, herb emulsion, microgreens', price: '$28', isVegan: true, isVegetarian: true },
    { id: 5, name: 'Duck Confit Salad', description: 'Crispy duck leg, frisée, poached pear, walnut', price: '$36', isVegan: false, isVegetarian: false },
  ],
  dinner: [
    { id: 1, name: 'Prime Ribeye Steak', description: '45-day aged, bone-in, herb butter, roasted garlic', price: '$78', isVegan: false, isVegetarian: false },
    { id: 2, name: 'Lobster Thermidor', description: 'Whole Maine lobster, cognac cream, gruyère gratin', price: '$95', isVegan: false, isVegetarian: false },
    { id: 3, name: 'Beef Wellington', description: 'Tenderloin, mushroom duxelles, puff pastry', price: '$85', isVegan: false, isVegetarian: false },
    { id: 4, name: 'Truffle Gnocchi', description: 'House-made potato gnocchi, black truffle, parmesan foam', price: '$48', isVegan: false, isVegetarian: true },
    { id: 5, name: 'Roasted Cauliflower Steak', description: 'Harissa glaze, tahini, pomegranate, herbs', price: '$38', isVegan: true, isVegetarian: true },
  ],
  brunch: [
    { id: 1, name: 'Eggs Royale', description: 'Smoked salmon, poached eggs, hollandaise, brioche', price: '$28', isVegan: false, isVegetarian: false },
    { id: 2, name: 'Wagyu Steak & Eggs', description: 'Grilled wagyu strip, truffle scrambled eggs, hash browns', price: '$52', isVegan: false, isVegetarian: false },
    { id: 3, name: 'Avocado Toast Deluxe', description: 'Sourdough, burrata, heirloom tomatoes, balsamic', price: '$24', isVegan: false, isVegetarian: true },
    { id: 4, name: 'Vegan Buddha Bowl', description: 'Quinoa, roasted vegetables, hummus, tahini', price: '$26', isVegan: true, isVegetarian: true },
    { id: 5, name: 'French Toast Brioche', description: 'Vanilla custard, berries, maple syrup, whipped cream', price: '$22', isVegan: false, isVegetarian: true },
  ],
};

export const features = [
  { id: 1, title: 'Full Bar', icon: 'Wine' },
  { id: 2, title: 'Outdoor Seating', icon: 'Sun' },
  { id: 3, title: 'Reservations', icon: 'CalendarCheck' },
  { id: 4, title: 'Parking Available', icon: 'Car' },
  { id: 5, title: 'Free Wi-Fi', icon: 'Wifi' },
  { id: 6, title: 'Table Service', icon: 'ConciergeBell' },
  { id: 7, title: 'Family Friendly', icon: 'Baby' },
  { id: 8, title: 'Serves Alcohol', icon: 'GlassWater' },
];

export const galleryImages = [
  { id: 1, src: images.hero, alt: 'Gourmet dish presentation', category: 'dishes' },
  { id: 2, src: images.interior, alt: 'Luxurious restaurant interior', category: 'interior' },
  { id: 3, src: images.ambiance, alt: 'Elegant dining ambiance', category: 'ambiance' },
  { id: 4, src: images.chef, alt: 'Chef at work', category: 'kitchen' },
  { id: 5, src: images.wellington, alt: 'Beef Wellington signature dish', category: 'dishes' },
  { id: 6, src: images.plating, alt: 'Artistic plating', category: 'dishes' },
];

export const testimonials = [
  {
    id: 1,
    quote: 'An extraordinary dining experience. The attention to detail and exquisite flavors left us speechless.',
    author: 'James M.',
    title: 'Food Critic, Gourmet Magazine',
  },
  {
    id: 2,
    quote: 'BAKAL : CUISINES redefines luxury dining. Every dish tells a story of passion and craftsmanship.',
    author: 'Elena V.',
    title: 'Executive Chef, Vienna',
  },
  {
    id: 3,
    quote: 'From the impeccable service to the unforgettable cuisine, this is fine dining at its absolute finest.',
    author: 'Robert K.',
    title: 'Business Executive',
  },
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Menus', href: '#menus' },
  { name: 'Experience', href: '#experience' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reservations', href: '#reservations' },
  { name: 'Contact', href: '#contact' },
];
