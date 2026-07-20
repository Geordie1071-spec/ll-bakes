import strawberryImg from '../assets/products/strawberry.png';
import chocImg from '../assets/products/choc.png';
import birthdayImg from '../assets/products/birthday.png';
import chocChipImg from '../assets/products/choc-chip.png';
import vanillaImg from '../assets/products/vanilla.png';
import redvelvetImg from '../assets/products/redvelvet.png';
import berrytartImg from '../assets/products/berrytart.png';
import croissantImg from '../assets/products/croissant.png';
import painchocImg from '../assets/products/painchoc.png';

export type Category = 'Cakes' | 'Cookies' | 'Cupcakes' | 'Pastries';

export interface Product {
  id: string;
  name: string;
  sub: string;
  price: number;
  cat: Category;
  tag: string;
  placeholder: string;
  image: string;
}

export const PRODUCT_CARD_COLOR = '#231F20';

export const categoryColor: Record<Category, string> = {
  Cakes: '#F0568C',
  Cookies: '#E8823F',
  Cupcakes: '#F4B740',
  Pastries: '#EFA0BE',
};

export const categories: Array<'All' | Category> = ['All', 'Cakes', 'Cookies', 'Cupcakes', 'Pastries'];

export const products: Product[] = [
  { id: 'strawberry', name: 'Strawberry Dream Cake', sub: 'Serves 8 · 3 layers', price: 42, cat: 'Cakes', tag: 'Bestseller', placeholder: 'cake photo', image: strawberryImg },
  { id: 'choc', name: 'Choc Fudge Cake', sub: 'Serves 10 · 4 layers', price: 48, cat: 'Cakes', tag: 'New', placeholder: 'cake photo', image: chocImg },
  { id: 'birthday', name: 'Birthday Cookie', sub: 'Box of 6 · 4oz', price: 29, cat: 'Cookies', tag: 'Bestseller', placeholder: 'cookie photo', image: birthdayImg },
  { id: 'choc-chip', name: 'Choc Chip Cookie', sub: 'Box of 12', price: 24, cat: 'Cookies', tag: '', placeholder: 'cookie photo', image: chocChipImg },
  { id: 'vanilla', name: 'Vanilla Cupcake', sub: 'Single · buttercream', price: 5, cat: 'Cupcakes', tag: 'Bestseller', placeholder: 'cupcake photo', image: vanillaImg },
  { id: 'redvelvet', name: 'Red Velvet Cupcake', sub: 'Single · cream cheese', price: 6, cat: 'Cupcakes', tag: '', placeholder: 'cupcake photo', image: redvelvetImg },
  { id: 'berrytart', name: 'Berry Tart', sub: 'Single · fresh fruit', price: 7, cat: 'Pastries', tag: '', placeholder: 'tart photo', image: berrytartImg },
  { id: 'croissant', name: 'Butter Croissant', sub: 'Single · flaky', price: 4, cat: 'Pastries', tag: 'Bestseller', placeholder: 'croissant photo', image: croissantImg },
  { id: 'painchoc', name: 'Pain au Chocolat', sub: 'Single · dark choc', price: 5, cat: 'Pastries', tag: '', placeholder: 'pastry photo', image: painchocImg },
];

export function getProduct(id: string | undefined): Product | undefined {
  return products.find((p) => p.id === id);
}

export const productBadges = [
  { label: 'Real Butter', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 14h14v5H5z"/><path d="M7 14l2.5-6h5L17 14"/></svg>' },
  { label: 'No Preservatives', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>' },
  { label: 'Small Batch', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3v4M12 3v4M17 3v4"/><path d="M5 9h14l-1 11H6z"/></svg>' },
  { label: 'Baked Fresh', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12a8 8 0 0116 0"/><path d="M4 12h16v3a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M9 6c0-1 1-1 1-2M13 6c0-1 1-1 1-2"/></svg>' },
];

const tasteNotesByCategory: Record<Category, string[]> = {
  Cakes: [
    'Fluffy vanilla sponge, three tall layers',
    'Fresh strawberry compote through the middle',
    'Whipped vanilla buttercream, never too sweet',
    'Topped with hand-picked seasonal berries',
  ],
  Cookies: [
    'Thick, chewy centre with crisp golden edges',
    'Brown butter base for a deep, toasty flavour',
    'Loaded with real chocolate, never chips-only filler',
    'Finished with a pinch of flaky sea salt',
  ],
  Cupcakes: [
    'Light, tender crumb baked fresh each morning',
    'Piled high with real buttercream, never too sweet',
    'Made in small batches with real butter and eggs',
    'Finished by hand with a simple, honest topping',
  ],
  Pastries: [
    'Dozens of buttery, laminated layers',
    'Baked at dawn for a crisp, golden shell',
    'Soft and airy on the inside, never dry',
    'Made fresh daily — nothing sits overnight',
  ],
};

export function tasteNotesFor(cat: Category) {
  return tasteNotesByCategory[cat];
}

export const sizeRatios = [1, 1.38, 1.81];
export const sizeLabels = ['6" · Serves 8', '8" · Serves 12', '10" · Serves 20'];
