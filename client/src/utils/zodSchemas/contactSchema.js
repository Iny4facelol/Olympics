import { z } from "zod";

export const contactSchema = z.object({
  user_email: z.string().email("El email no es válido"),
  user_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  user_message: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(255, {
      message: "La descripción no puede tener más de 255 caracteres",
    }),
});
