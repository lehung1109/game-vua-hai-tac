import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email("Email invalid"),
  username: z
    .string()
    .min(3, "Username minimum 3 characters")
    .max(30, "Username maximum 30 characters")
    .regex(/^[a-zA-Z0-9_.]+$/, "Only allow a-z, 0-9, _ and ."),
  password: z.string().min(6, "Password minimum 6 characters").max(72),
});

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

// get first error message from zod error
export function getFirstZodError(err: z.ZodError): string {
  const first = err.issues?.[0];
  return first?.message ?? "Data invalid"; // default message
}

// (Optional) default values cho form
export const REGISTER_FORM_DEFAULTS: RegisterFormValues = {
  email: "",
  username: "",
  password: "",
};
