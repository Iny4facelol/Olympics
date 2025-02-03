import { z } from "../../../client/node_modules/zod";

export const loginSchema = z.object({
  user_email: z.string().email("El email no es válido"),
  user_password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
    .regex(/[a-z]/, "La contraseña debe tener al menos una minúscula")
    .regex(/[0-9]/, "La contraseña debe tener al menos un número"),
});
