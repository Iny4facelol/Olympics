import { z } from "../../../client/node_modules/zod";

export const registerSchema = z
  .object({
    user_name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres"),
    user_lastname: z
      .string()
      .min(2, "Los apellidos deben tener al menos 2 caracteres")
      .max(50, "Los apellidos no pueden tener más de 50 caracteres"),
    user_tutor_name: z
      .string()
      .min(2, "El nombre del tutor debe tener al menos 2 caracteres")
      .max(50, "El nombre del tutor no puede tener más de 50 caracteres"),
    user_tutor_lastname: z
      .string()
      .min(2, "Los apellidos del tutor deben tener al menos 2 caracteres")
      .max(50, "Los apellidos del tutor no pueden tener más de 50 caracteres"),
    user_dni: z
      .string()
      .regex(
        /^[0-9]{8}[A-Z]$/,
        "El DNI debe tener 8 números seguidos de una letra mayúscula"
      ),
    user_city: z
      .string()
      .min(2, "La localidad debe tener al menos 2 caracteres"),
    user_address: z
      .string()
      .min(5, "La dirección debe tener al menos 5 caracteres"),
    user_phone: z
      .string()
      .regex(/^[0-9]{9}$/, "El teléfono debe tener 9 números"),
    user_birth_date: z.string().refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      return birthDate < today;
    }, "La fecha de nacimiento no puede ser futura"),
    user_email: z.string().email("El email no es válido"),
    user_password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
      .regex(/[a-z]/, "La contraseña debe tener al menos una minúscula")
      .regex(/[0-9]/, "La contraseña debe tener al menos un número"),
    user_confirm_password: z.string(),
    user_center_id: z.string().min(1, "Debes seleccionar un centro"),
  })
  .refine((data) => data.user_password === data.user_confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["user_confirm_password"],
  });

export const registerResponsibleSchema = z.object({
  user_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  user_email: z.string().email("El email no es válido"),
  user_center_id: z.string().min(1, "Debes seleccionar un centro"),
});

export const completeRegisterResponsibleSchema = z
  .object({
    user_name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres"),
    user_lastname: z
      .string()
      .min(2, "Los apellidos deben tener al menos 2 caracteres")
      .max(50, "Los apellidos no pueden tener más de 50 caracteres"),
    user_phone: z
      .string()
      .regex(/^[0-9]{9}$/, "El teléfono debe tener 9 números"),
    user_dni: z
      .string()
      .regex(
        /^[0-9]{8}[A-Z]$/,
        "El DNI debe tener 8 números seguidos de una letra mayúscula"
      ),
    user_password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
      .regex(/[a-z]/, "La contraseña debe tener al menos una minúscula")
      .regex(/[0-9]/, "La contraseña debe tener al menos un número"),
    user_confirm_password: z.string(),
  })
  .refine((data) => data.user_password === data.user_confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["user_confirm_password"],
  });

export const editUserSchema = z.object({
  user_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  user_lastname: z
    .string()
    .min(2, "Los apellidos deben tener al menos 2 caracteres")
    .max(50, "Los apellidos no pueden tener más de 50 caracteres"),
  user_tutor_name: z
    .string()
    .min(2, "El nombre del tutor debe tener al menos 2 caracteres")
    .max(50, "El nombre del tutor no puede tener más de 50 caracteres"),
  user_tutor_lastname: z
    .string()
    .min(2, "Los apellidos del tutor deben tener al menos 2 caracteres")
    .max(50, "Los apellidos del tutor no pueden tener más de 50 caracteres"),
  user_dni: z
    .string()
    .regex(
      /^[0-9]{8}[A-Z]$/,
      "El DNI debe tener 8 números seguidos de una letra mayúscula"
    ),
  user_city: z.string().min(2, "La localidad debe tener al menos 2 caracteres"),
  user_address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres"),
  user_birth_date: z.string().refine((date) => {
    const today = new Date();
    const birthDate = new Date(date);
    return birthDate < today;
  }, "La fecha de nacimiento no puede ser futura"),
  user_phone: z
    .string()
    .regex(/^[0-9]{9}$/, "El teléfono debe tener 9 números"),
  user_center_id: z.any(),
});

export const editResponsibleSchema = z.object({
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
  user_city: z.string().min(2, "La localidad debe tener al menos 2 caracteres"),
  user_phone: z
    .string()
    .regex(/^[0-9]{9}$/, "El teléfono debe tener 9 números"),
  user_center_id: z.any(),
});

export const emailSchema = z.object({
  user_email: z.string().email("El email no es válido"),
});

export const passwordSchema = z
  .object({
    user_password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
      .regex(/[a-z]/, "La contraseña debe tener al menos una minúscula")
      .regex(/[0-9]/, "La contraseña debe tener al menos un número"),
    user_confirm_password: z.string(),
  })
  .refine((data) => data.user_password === data.user_confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["user_confirm_password"],
  });
