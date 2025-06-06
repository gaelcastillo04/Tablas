import Joi from 'joi';

export default class EmployeeFormSchema {
    isUpdate;

    tailor;

    schema = Joi.object({
        phoneNumber: Joi.string()
            .alter({
                save: (props) => props.required(),
                update: (props) => props.optional(),
            })
            .max(10)
            .min(10)
            .pattern(/^\d{10}$/)
            .messages({
                'any.required': 'Se requiere un número teléfonico.',
                'string.max': 'El número telefónico debe de ser de 10 dígitos',
                'string.min': 'El número telefónico debe de ser de 10 dígitos',
                'string.pattern.base': 'El número debe tener exactamente 10 dígitos.',
                'string.empty': 'El campo no puede estar vacío.',
            }),
        password: Joi.string()
            .alter({
                save: (props) => props.required(),
                // update: (props) => props.optional(),
            })
            .min(6)
            .max(18)
            .messages({
                'any.required': 'Se requiere una contraseña.',
                'string.max': 'La contraseña debe de ser máximo de 18 dígitos',
                'string.min': 'La contraseña debe de ser minimo de 6 dígitos',
            }),

        firstName: Joi.string()
            .pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s+[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
            .alter({
                save: (props) => props.required(),
                // update: (props) => props.optional(),
            })
            .messages({
                'any.required': 'Se requiere un nombre.',
                'string.pattern.base': 'Nombre invalido. Verifque espacios dobles o signos invalidos. [Áá-Zz]',
            }),

        lastName: Joi.string()
            .pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s+[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/)
            .alter({
                save: (props) => props.required(),
                // update: (props) => props.optional(),
            })
            .messages({
                'any.required': 'Se requiere un apellido.',
                'string.pattern.base': 'Nombre invalido. Verifque espacios dobles o signos invalidos. [Áá-Zz]',
            }),

        branchOfficeId: Joi.number()
            .alter({
                save: (props) => props.required(),
                // update: (props) => props.optional(),
            })
            .messages({
                'any.required': 'Se requiere una sucursal.'
            }),

        departments: Joi.array()
            .alter({
                save: (props) => props.required(),
                // update: (props) => props.optional(),
            })
            .messages({
                'any.required': 'Se requiere al menos un departamento.'
            }),
        roleId: Joi.number()
            .alter({
                save: (props) => props.required(),
                // update: (props) => props.optional(),
            })
            .messages({
                'any.required': 'Se requiere un rol.'
            }),

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