import Joi from 'joi';

export default class ProductFormSchema {
  isUpdate;
  tailor;

  schema = Joi.object({
    name: Joi.string()
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .max(100)
      .messages({
        'string.empty': 'El nombre es obligatorio.',
        'string.max': 'El nombre debe tener máximo 100 caracteres.'
      }),

    price: Joi.string()
      .pattern(/^\$?\d+(\.\d{2})?$/)
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .messages({
        'string.pattern.base': 'El precio debe ser un número válido (ej. $25.00).',
        'string.empty': 'El precio es obligatorio.'
      }),

    category: Joi.string()
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .messages({
        'string.empty': 'La categoría es obligatoria.'
      }),

    description: Joi.string()
      .allow('', null)
      .max(255)
      .messages({
        'string.max': 'La descripción no debe exceder los 255 caracteres.'
      }),

    stock: Joi.number()
      .integer()
      .min(0)
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .messages({
        'number.base': 'El stock debe ser un número.',
        'number.integer': 'El stock debe ser un número entero.',
        'number.min': 'El stock no puede ser negativo.',
        'any.required': 'El stock es obligatorio.'
      })
  });

  constructor(isUpdate = false) {
    this.tailor = isUpdate ? 'update' : 'save';
  }

  getSchema = () => this.schema.tailor(this.tailor);

  validateSchema = (entry) => {
    const { error, value } = this.getSchema().validate(entry);
    if (error) {
      throw new Error(error.message.replaceAll('"', ''));
    }
    return value;
  };
}
