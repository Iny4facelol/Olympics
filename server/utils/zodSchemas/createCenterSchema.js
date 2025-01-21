import { z } from "zod";

export const createCenterSchema = z.object({
  center_name: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  center_email: z.string().email("El email no es válido"),
});