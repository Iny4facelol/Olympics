import {z} from 'zod';

export const centerSchema = z.object({
  center_city: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  center_province: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  center_address: z.string().min(5, "Debe tener al mínimo 5 carácteres"),
  center_phone: z.string().min(9, "Debe tener al mínimo 9 números"),

});