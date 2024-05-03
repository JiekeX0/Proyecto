import { create, test, enforce } from 'vest';

export const EditFormValidation = create((data = {}) => {
  test('title', 'El título es requerido', () => {
    enforce(data.title.trim()).isNotEmpty();
  });

  test('title', 'El título mínimo de 3 caracteres', () => {
    enforce(data.title).longerThanOrEquals(3);
  });

  test('price', 'El precio es requerido', () => {
    enforce(data.price).isNotEmpty();
  });

  test('category', 'La categoría es requerida', () => {
    enforce(data.category.trim()).isNotEmpty();
  });

  test('category', 'La categoría mínimo de 3 caracteres', () => {
    enforce(data.category).longerThanOrEquals(3);
  });

  test('image', 'La imagen es requerida', () => {
    enforce(data.image.trim()).isNotEmpty();
  });

  test('image', 'La URL de la imagen mínimo de 8 caracteres', () => {
    enforce(data.image).longerThanOrEquals(8);
  });

  test('description', 'La descripción es requerida', () => {
    enforce(data.description.trim()).isNotEmpty();
  });

  test('description', 'La descripción mínimo de 10 caracteres', () => {
    enforce(data.description).longerThanOrEquals(10);
  });
}) 