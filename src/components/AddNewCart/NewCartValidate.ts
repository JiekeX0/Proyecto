import { create, test, enforce } from 'vest';

export interface Product {
    title: string;
    quantity: number;
}

export const NewCartValidate = create((data = {}) => {
    test('userId', () => {
        enforce(data.userId)
            .message('El id de usuario es un campo requerido')
            .isNotEmpty()
            .message('El id de usuario tiene que ser mayor que cero')
            .isPositive();
    });

    test('date', () => {
        enforce(data.date)
            .message('La fecha es un campo requerido')
            .isNotEmpty();
    });

    test('products', () => {
        enforce(data.products)
            .isArray()
            .message('Los productos deben ser un arreglo');

        data.products.forEach((product: Product, index: number) => {
            test(`products.${index}.title`, () => {
                enforce(product.title)
                    .message(`El título del producto ${index + 1} es un campo requerido`)
                    .isNotEmpty();
            });

            test(`products.${index}.quantity`, () => {
                enforce(product.quantity)
                    .message(`La cantidad del producto ${index + 1} es un campo requerido`)
                    .isNotEmpty()
                    .message(`La cantidad del producto ${index + 1} debe ser un número positivo`)
                    .isPositive();
            });
        });
    });
});