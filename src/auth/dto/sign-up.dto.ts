import { z } from "zod";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const signUpRequestSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.coerce
    .string()
    .min(10)
    .max(11)
    .superRefine((val, ctx) => {
      const res = z.coerce.number().int().positive().safeParse(val);
      if (!res.success) {
        res.error.issues.forEach((issue) => ctx.addIssue(issue));
      }
    }),
  countryCode: z.string().min(1).max(4),
  password: z.string().min(8).regex(passwordRegex, {
    message:
      "Must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
  }),
  referralSource: z.string().min(1),
});

export type SignUpDto = z.infer<typeof signUpRequestSchema>
