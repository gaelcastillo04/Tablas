import Joi from 'joi';

export default class OrderFormSchema {
  isUpdate;
  tailor;

  schema = Joi.object({
    phoneNumber: Joi.string()
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .max(10)
      .min(10)
      .pattern(/^[0-9]{10}$/)
      .messages({
        'any.required': 'Se requiere un número telefónico.',
        'string.empty': 'El campo no puede estar vacío.',
        'string.pattern.base': 'Debe contener exactamente 10 dígitos.',
        'string.min': 'Debe contener exactamente 10 dígitos.',
        'string.max': 'Debe contener exactamente 10 dígitos.'
      }),

    total: Joi.string()
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .messages({
        'any.required': 'Se requiere el total de la orden.',
        'string.empty': 'El campo total no puede estar vacío.'
      }),

    status: Joi.string()
      .valid('Entregado', 'Cancelado', 'Pendiente')
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .messages({
        'any.required': 'Se requiere el estado de la orden.',
        'string.empty': 'El estado no puede estar vacío.',
        'any.only': 'El estado debe ser Entregado, Cancelado o Pendiente.'
      }),

    created: Joi.date()
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .messages({
        'any.required': 'Se requiere la fecha de creación.',
        'date.base': 'Debe ser una fecha válida.'
      }),

    cancelled: Joi.date()
      .allow('', null)
      .optional()
      .messages({
        'date.base': 'Debe ser una fecha válida.'
      }),

    products: Joi.array().items(Joi.string())
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .messages({
        'any.required': 'Debe incluir al menos un producto.',
        'array.base': 'Debe ser una lista de productos.'
      })
  });

  constructor(isUpdate = false) {
    this.tailor = isUpdate ? 'update' : 'save';
  }

  getSchema = () => this.schema.tailor(this.tailor);

  validateSchema = (entry) => {
    const { error, value } = this.getSchema().validate(entry);
    if (error) {
      console.error('Validation error', error.message);
      throw new Error(error.message.replaceAll('"', ''));
    }
    return value;
  }
}
