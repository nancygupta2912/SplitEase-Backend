const prisma = require("../config/prisma");

const createExpense = async (groupId,expenseData, userId) => {
    const {
        description,
        amount,
        participants
    } = expenseData;

    const splitAmount = amount / participants.length;

    return await prisma.$transaction(async(tx)=>{
        const expense = await tx.expense.create({
            data:{
              description,
              amount,
              groupId:Number(groupId),
              paidBy:userId
            }
        });


        for(const participantId of participants){
            await tx.expenseSplit.create({
                data:{
                    expenseId:expense.id,
                    userId:participantId,
                    amount:splitAmount
                }
            });
        }
        return expense;
    });
};


const getGroupExpenses = async (groupId) => {

    const expenses = await prisma.expense.findMany({
        where: {
            groupId: Number(groupId)
        },

        include:{
            payer:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },
            splits: {
                include: {
                    user:{
                        select:{
                            id:true,
                            name:true,
                            email:true
                        }
                    }
                }
            }
        }
    });

    return expenses;

};


const getBalances = async (groupId) => {

    const expenses = await prisma.expense.findMany({

        where:{
            groupId:Number(groupId)
        },

        include:{
            splits:true
        }

    });

    const balanceMap = {};

    for(const expense of expenses){

        balanceMap[expense.paidBy] =
        (balanceMap[expense.paidBy] || 0)
        + expense.amount;

        for(const split of expense.splits){

            balanceMap[split.userId] =
            (balanceMap[split.userId] || 0)
            - split.amount;

        }

    }

    const users = await prisma.groupMember.findMany({

        where: {
            groupId: Number(groupId)
        },

        include: {
            user: true
        }

    });

    return users.map((member) => ({

        userId: member.user.id,

        name: member.user.name,

        balance: balanceMap[member.user.id] || 0

    }));

};



module.exports = {
    createExpense,
    getGroupExpenses,
    getBalances
};