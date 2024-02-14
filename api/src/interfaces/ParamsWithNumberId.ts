import * as z from 'zod';

export const ParamsWithNumberId = z.object({
    id: z.string().min(1).refine((val) => {
        try {
            if (/^\d+$/.test(val)) {
                return val;
            }
            return false;
        } catch (error) {
            return false;
        }
    }, {
        message: 'Id must be a number',
    },),
});

export type ParamsWithNumberId = z.infer<typeof ParamsWithNumberId>;

