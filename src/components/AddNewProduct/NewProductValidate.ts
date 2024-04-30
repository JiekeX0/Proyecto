import {create, test, enforce } from 'vest'

export const NewProductValidate = create((data = {}) =>{

    test('title', () =>{
        enforce(data.title)
        .message('El titulo es un campo requerido')
        .isNotBlank()
        .message('El titulo debe contener al menos 3 caracteres')
        .longerThan(2)
    });

    test('price',  () =>{
        enforce(data.price)
        .message('El precio es un campo requerido')
        .isNotEmpty()
        .message('El precio tiene que ser mayor que cero')
        .isPositive()

    });

    test('category', 'La categoria es un campo requerido', () =>{
        enforce(data.category).isNotEmpty();
    });

    test('description', 'La descripción es un campo requerido', () => {
        enforce(data.description).isNotEmpty();
    });

    test('image', () => {
        enforce(data.image)
        .message('La imagen es un campo requerido')
        .isNotBlank()
        .message('Introduce una URL valida -- ej URL: "(http(s)://)url.com"') 
        .matches(/^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/)
    })

})