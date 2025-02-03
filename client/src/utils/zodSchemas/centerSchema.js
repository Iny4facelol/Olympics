import { z } from "../../../client/node_modules/zod";

export const centerSchema = z.object({
  center_city: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  center_province: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  center_address: z.string().min(5, "Debe tener al mínimo 5 carácteres"),
  center_phone: z.string().min(9, "Debe tener al mínimo 9 números"),
});

export const createCenterSchema = z.object({
  center_name: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  center_email: z.string().email("El email no es válido"),
});

export const editCenterSchema = z.object({
  center_name: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  center_email: z.string().email("El email no es válido"),
  center_city: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  center_province: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  center_address: z.string().min(5, "Debe tener al mínimo 5 carácteres"),
  center_phone: z.string().min(9, "Debe tener al mínimo 9 números"),
});
