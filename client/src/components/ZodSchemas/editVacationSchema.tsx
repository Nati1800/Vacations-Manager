import * as z from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0)

export const editVacationSchema = z.object({
    destination: z.string().nonempty("Destination is required"),
    description: z.string().nonempty("Description is required"),
    start_date: z
      .string()
      .nonempty("Start date is required"),
    end_date: z.string()
    .nonempty("End date is required"),
    price: z
      .number()
      .min(1, "Price must higher than 0$")
      .max(10000, "Price cannot be higher than 10,000$"),
    image: z.string().url("Image must be a valid URL"),
  }).refine(
    (data) => new Date(data.end_date) >= new Date(data.start_date),
    {
      path: ["end_date"],
      message: "End date cannot be earlier than the start date",
    }   
  );