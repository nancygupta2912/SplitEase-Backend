const express=require("express");

const router=express.Router();

const authenticate=require("../middlewares/auth.middleware");

const validate=require("../middlewares/validate.middleware");

const {createExpenseSchema}=require("../validators/expense.validator");

const {createExpense,getBalances,getGroupExpenses}=require("../controllers/expense.controller");


router.post(
    "/:groupId/expenses",
    authenticate,
    validate(createExpenseSchema),
    createExpense
);


router.get(
    "/:groupId/expenses",
    authenticate,
    getGroupExpenses
);


router.get(
  "/:groupId/balance",
  authenticate,
  getBalances
)




module.exports=router;