import Joi from 'joi';

export default class UserFormSchema {
  isUpdate;
  tailor;

  schema = Joi.object({
    firstName: Joi.string()
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .min(2)
      .max(30)
      .messages({
        'any.required': 'El nombre es obligatorio.',
        'string.empty': 'El nombre no puede estar vacío.',
        'string.min': 'Debe tener al menos 2 caracteres.',
        'string.max': 'Debe tener como máximo 30 caracteres.'
      }),

    lastName: Joi.string()
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .min(2)
      .max(30)
      .messages({
        'any.required': 'El apellido es obligatorio.',
        'string.empty': 'El apellido no puede estar vacío.',
        'string.min': 'Debe tener al menos 2 caracteres.',
        'string.max': 'Debe tener como máximo 30 caracteres.'
      }),

    role: Joi.string()
      .valid('Admin', 'Usuario')
      .alter({
        save: (s) => s.required(),
        update: (s) => s.optional()
      })
      .messages({
        'any.required': 'El rol es obligatorio.',
        'any.only': 'Debe ser Admin o Usuario.',
        'string.empty': 'El rol no puede estar vacío.'
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
