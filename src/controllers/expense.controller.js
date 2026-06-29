const expenseService = require("../services/expense.service");

const createExpense = async(req,res)=>{
    try{
        const expense = await expenseService.createExpense(
            req.params.groupId,
            req.body,
            req.user.id
        );

        return res.status(201).json(expense);
    }

    catch(error){
        return res.status(500).json({
            error:error.message
        });
    }
}


const getBalances = async(req,res)=>{
    try{
        const balances =
        await expenseService.getBalances(
            req.params.groupId
        );
        return res.json(balances);
    }

    catch(error){
        return res.status(500).json({
            error:error.message
        });
    }
}


const getGroupExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.getGroupExpenses(
            req.params.groupId
        );
        return res.status(200).json(expenses);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};


module.exports={
    createExpense,
    getBalances,
    getGroupExpenses
}