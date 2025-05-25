import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1, "required")
})

export type FormType = z.infer<typeof formSchema>