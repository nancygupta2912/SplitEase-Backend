const express = require("express");

const router = express.Router();

const { createGroup,getMyGroups,addMember,getGroupMembers,getGroup } = require("../controllers/group.controller");

const authenticate = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");

const { createGroupSchema, addMemberSchema } = require("../validators/group.validator");

router.post(
  "/",
  authenticate,
  validate(createGroupSchema),
  createGroup
);


router.post(

    "/:groupId/members",
    authenticate,
    validate(addMemberSchema),
    addMember

);


router.get("/",authenticate,getMyGroups);


router.get("/:groupId/members",authenticate,getGroupMembers);

router.get("/:groupId",authenticate,getGroup);


module.exports = router;