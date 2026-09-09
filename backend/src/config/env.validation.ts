import Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number()
    .port()
    .default(4000),

  DATABASE_URL: Joi.string()
    .uri({
      scheme: [
        'postgresql',
        'postgres',
      ],
    })
    .required(),

  JWT_SECRET: Joi.string()
    .min(32)
    .required(),

  JWT_EXPIRES_IN: Joi.string()
    .default('1d'),

  SUPABASE_URL: Joi.string()
    .uri({
      scheme: ['https'],
    })
    .required(),

  SUPABASE_SECRET_KEY: Joi.string()
    .required(),

  SUPABASE_STORAGE_BUCKET: Joi.string()
    .required(),

  FRONTEND_URL: Joi.string()
    .uri({
      scheme: ['http', 'https'],
    })
    .required(),
});
