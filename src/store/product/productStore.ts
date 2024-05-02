import { create } from 'zustand';

export interface Product {
    id?: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    rating?: {
        rate: number;
        count: number;
    };
}

interface ProductStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    deleteProduct: (productId: number) => void;
    editProduct: (productId: number, updatedProduct: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [], 
    setProducts: (products) => {
        set({products: products})
    },

    deleteProduct: (productId: number) => {
        set((state) => ({
            products: state.products.filter((product) => product.id !== productId),
        }));
    },
    editProduct: (productId: number, updatedProduct: Product) => { // función para editar un producto
        set((state) => ({
            products: state.products.map((product) => {
                if (product.id === productId) {
                    // Si encontramos el producto a editar, lo actualizamos con el nuevo producto
                    return { ...product, ...updatedProduct };
                }
                return product;
            }),
        }));
    },
}));
