import { categories } from '../data/whitelist.json';

export default ext => categories[ext] || 'Other';
