import { z } from "zod";

export const activitySchema = z.object({
  activity_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  activity_description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  max_participants_number: z.number({
    invalid_type_error: "El número máximo de participantes debe ser un número",
  }),
  img: z.any()
});
