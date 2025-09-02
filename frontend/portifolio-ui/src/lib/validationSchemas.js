import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  message: z.string().min(10, 'Mensagem muito curta'),
});
