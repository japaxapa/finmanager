import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),

  type: z.enum(['income', 'expense'], {
    message: 'Tipo é obrigatório',
  }),

  budget_goal: z
    .number({
      error: 'Insira um valor válido',
    })
    .min(0, 'O valor deve ser maior ou igual a 0'),

  color: z.string().min(1, 'Cor é obrigatória'),

  icon: z.string().min(1, 'Ícone é obrigatório'),
});

export type CategoryFormInputs = z.infer<typeof categorySchema>;
