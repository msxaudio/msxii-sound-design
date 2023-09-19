import { z } from "zod";
import { boxVariants } from "~/libs/utils/appData";

// export const CreateTwVariantsSchema = z.record(z.string(), z.string());

export const TwVariantsSchemaRefined = z
  .record(
    z.string().or(z.number()),
    z.string().or(z.number()).nullable().optional(),
  )
  .refine(
    (data) => {
      // data.phone === data.confirmPhone
      for (const key in data) {
        const boxVariantsValue = boxVariants[key as keyof typeof boxVariants];
        const value = data[key];

        if (!value) return true;

        if (boxVariantsValue) {
          return !!boxVariantsValue[value as keyof typeof boxVariantsValue];
        }

        return false;
      }

      return false;
    },
    {
      message: "undefined tw variant",
    },
  );

export const CreateOneTwVariantsSchema = {
  twVariants: TwVariantsSchemaRefined,
};

export const UpdateOneTwVariantsSchema = {
  cssId: z.string().cuid2(),
  twVariants: TwVariantsSchemaRefined,
};
