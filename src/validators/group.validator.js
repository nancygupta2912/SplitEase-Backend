const { z } = require("zod");

const createGroupSchema = z.object({
    name: z.string().min(1, "Group name is required")
});

const addMemberSchema = z.object({
    email: z.string().email("Invalid email")
});

module.exports = {
    createGroupSchema,
    addMemberSchema
};