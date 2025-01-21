import { z } from "zod";

export const activitySchema = z.object({
  activity_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  activity_description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  max_participants: z.number({
    invalid_type_error: "El número máximo de participantes debe ser un número",
  }),
  activity_image: z
    .instanceof(FileList, { invalid_type_error: "Tipo de archivo inválido" })
    .refine((files) => files?.length === 1, "Se requiere una imagen")
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type
        ),
      "Formato permitido: .jpg, .jpeg, .png, .webp"
    ),
});
