const { z } = require("zod");

const createExpenseSchema = z.object({
    description: z.string().min(1),
    amount: z.number().positive(),
    participants: z.array(z.number()).min(1)
});

module.exports = {
    createExpenseSchema
};