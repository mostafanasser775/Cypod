import { z } from "zod";

export const userSchema = z.object({
  userName: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
});
