import { z } from 'zod';
import { ACCOUNT_TYPE_VALUES } from '../constants/forms.constants';

export const accountSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome da conta é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),

  type: z.enum(ACCOUNT_TYPE_VALUES, { message: 'Tipo de conta é obrigatório' }),

  initial_balance: z.number({
    error: 'Insira um valor válido',
  }),

  color: z.string().min(1, 'Cor é obrigatória'),

  icon: z.string().min(1, 'Ícone é obrigatório'),
});

export type AccountFormInputs = z.infer<typeof accountSchema>;
