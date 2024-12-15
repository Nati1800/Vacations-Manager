import { z } from "zod";


export const registerSchema = z.object({
    first_name: z.string().nonempty("First Name is required"),
    last_name: z.string().nonempty("Last Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(4, "Password must be at least 4 characters long")
});