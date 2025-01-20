import { z } from "zod";

export const completeResponsibleSchema = z
.object({
  user_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  user_lastname: z
    .string()
    .min(2, "Los apellidos deben tener al menos 2 caracteres")
    .max(50, "Los apellidos no pueden tener más de 50 caracteres"),
  user_dni: z
  .string()
  .regex(
    /^[0-9]{8}[A-Z]$/,
    "El DNI debe tener 8 números seguidos de una letra mayúscula"
  ),
  user_phone: z
    .string()
    .regex(/^[0-9]{9}$/, "El teléfono debe tener 9 números"),
  user_password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
    .regex(/[a-z]/, "La contraseña debe tener al menos una minúscula")
    .regex(/[0-9]/, "La contraseña debe tener al menos un número"),
  user_confirm_password: z.string()
})
.refine((data) => data.user_password === data.user_confirm_password, {
  message: "Las contraseñas no coinciden",
  path: ["user_confirm_password"],
});