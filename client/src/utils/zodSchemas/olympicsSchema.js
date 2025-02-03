import { z } from "../../../client/node_modules/zod";

export const olympicsSchema = z.object({
  olympics_name: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  olympics_host_name: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  olympics_host_city: z.string().min(3, "Debe tener al mínimo 3 carácteres"),
  olympics_host_address: z.string().min(5, "Debe tener al mínimo 5 carácteres"),
  olympics_start_date: z.string().min(10, "Debe tener al mínimo 10 carácteres"),
  olympics_end_date: z.string().min(10, "Debe tener al mínimo 10 carácteres"),
  olympics_description: z
    .string()
    .min(10, "Debe tener al mínimo 10 carácteres"),
});
