import { z } from "zod";

export const regResponsibleSchema = z

.object ({
  user_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  user_email: z.string().email("El email no es válido") ,
  user_center_id: z.string().min(1, "Debes seleccionar un centro")  
});