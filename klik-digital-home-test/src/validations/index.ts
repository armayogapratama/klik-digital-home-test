import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(2, "Username minimal 2 karakter"),
  password: z.string().min(9, "Password minimal 9 karakter"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
