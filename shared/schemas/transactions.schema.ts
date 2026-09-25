import { z } from 'zod';

export const transactionSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(100, 'Título deve ter no máximo 100 caracteres'),

  amount: z
    .number({
      error: 'Insira um valor válido',
    })
    .positive('O valor deve ser maior que 0'),

  type: z.enum(['income', 'expense'], {
    message: 'Tipo é obrigatório',
  }),

  transaction_date: z.string().min(1, 'A data é obrigatória'),

  category_id: z.string().optional().nullable(),

  account_id: z.string().min(1, 'Conta é obrigatória'),

  description: z
    .string()
    .max(500, 'A descrição deve ter no máximo 500 caracteres')
    .optional()
    .nullable(),
});
