import { create } from 'zustand';
import { Box, BoxItem } from '../types';

interface BoxState {
  boxes: Box[];
  getBoxes: (branch?: string) => Box[];
  getBox: (id: string) => Box | undefined;
  addBox: (category: 'A' | 'B' | 'C', branch: string) => Box;
  addItemToBox: (boxId: string, item: BoxItem) => void;
  updateItemQuantity: (boxId: string, sku: string, quantity: number) => void;
  removeItem: (boxId: string, sku: string) => void;
  isBoxEmpty: (boxId: string) => boolean;
  getNextBoxNumber: (category: 'A' | 'B' | 'C', branch: string) => string;
  searchBoxesBySku: (sku: string, branch?: string) => Box[];
}

// Mock initial boxes
const initialBoxes: Box[] = [
  {
    id: 'A001-B1',
    category: 'A',
    number: 'A001',
    branch: 'Branch 1',
    items: [
      { sku: 'SKU001', name: 'Product One', quantity: 25, price: 15000 },
      { sku: 'SKU002', name: 'Product Two', quantity: 10, price: 25000 }
    ]
  },
  {
    id: 'B001-B1',
    category: 'B',
    number: 'B001',
    branch: 'Branch 1',
    items: [
      { sku: 'SKU003', name: 'Product Three', quantity: 15, price: 10000 }
    ]
  }
];

export const useBoxStore = create<BoxState>((set, get) => ({
  boxes: initialBoxes,
  
  getBoxes: (branch?: string) => {
    const { boxes } = get();
    if (branch) {
      return boxes.filter(box => box.branch === branch);
    }
    return boxes;
  },
  
  getBox: (id: string) => {
    const { boxes } = get();
    return boxes.find(box => box.id === id);
  },
  
  addBox: (category, branch) => {
    const newBoxNumber = get().getNextBoxNumber(category, branch);
    const newBox: Box = {
      id: `${newBoxNumber}-${branch.replace(/\s+/g, '')}`,
      category,
      number: newBoxNumber,
      branch,
      items: []
    };
    
    set(state => ({
      boxes: [...state.boxes, newBox]
    }));
    
    return newBox;
  },
  
  addItemToBox: (boxId, item) => {
    set(state => ({
      boxes: state.boxes.map(box => {
        if (box.id === boxId) {
          // Check if item already exists
          const existingItemIndex = box.items.findIndex(i => i.sku === item.sku);
          
          if (existingItemIndex >= 0) {
            // Update quantity if item exists
            const updatedItems = [...box.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + item.quantity
            };
            return { ...box, items: updatedItems };
          } else {
            // Add new item
            return { ...box, items: [...box.items, item] };
          }
        }
        return box;
      })
    }));
  },
  
  updateItemQuantity: (boxId, sku, quantity) => {
    set(state => ({
      boxes: state.boxes.map(box => {
        if (box.id === boxId) {
          return {
            ...box,
            items: box.items.map(item => {
              if (item.sku === sku) {
                return { ...item, quantity };
              }
              return item;
            }).filter(item => item.quantity > 0) // Remove items with zero quantity
          };
        }
        return box;
      })
    }));
  },
  
  removeItem: (boxId, sku) => {
    set(state => ({
      boxes: state.boxes.map(box => {
        if (box.id === boxId) {
          return {
            ...box,
            items: box.items.filter(item => item.sku !== sku)
          };
        }
        return box;
      })
    }));
  },
  
  isBoxEmpty: (boxId) => {
    const box = get().getBox(boxId);
    return box ? box.items.length === 0 : true;
  },
  
  getNextBoxNumber: (category, branch) => {
    const { boxes } = get();
    const branchBoxes = boxes.filter(b => b.branch === branch && b.category === category);
    
    if (branchBoxes.length === 0) {
      return `${category}001`;
    }
    
    // Extract numbers from box numbers and find the highest one
    const numbers = branchBoxes.map(b => {
      const match = b.number.match(/[A-C](\d+)[A-Z]?/);
      return match ? parseInt(match[1], 10) : 0;
    });
    
    const nextNumber = Math.max(...numbers) + 1;
    return `${category}${String(nextNumber).padStart(3, '0')}`;
  },
  
  searchBoxesBySku: (sku, branch) => {
    const { boxes } = get();
    const filteredBoxes = branch 
      ? boxes.filter(box => box.branch === branch) 
      : boxes;
      
    return filteredBoxes.filter(box => 
      box.items.some(item => item.sku.toLowerCase().includes(sku.toLowerCase()))
    );
  }
}));