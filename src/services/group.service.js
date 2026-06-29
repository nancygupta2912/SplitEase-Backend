const prisma = require("../config/prisma");

const createGroup = async (groupData, userId) => {
  const { name } = groupData;

  return await prisma.$transaction(async (tx) => {

    // 1. Create Group
    const group = await tx.group.create({
      data: {
        name,
        createdBy: userId,
      },
    });

    // 2. Add creator as ADMIN
    await tx.groupMember.create({
      data: {
        groupId: group.id,
        userId: userId,
        role: "ADMIN",
      },
    });

    return group;
  });
};



const getMyGroups = async (userId) => {

    const groups = await prisma.group.findMany({
        where: {
            groupMembers: {
                some: {
                    userId: userId
                }
            }
        }
    });

    return groups;
};


const addMember = async (groupId, email) => {

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    });

    if(!user){
        throw new Error("User not found");
    }

    const existingMember = await prisma.groupMember.findUnique({
        where:{
            groupId_userId:{
                groupId:Number(groupId),
                userId:user.id
            }
        }
    });

    if(existingMember){
        throw new Error("User is already a member");
    }

    await prisma.groupMember.create({
        data:{
            groupId:Number(groupId),
            userId:user.id,
            role:"MEMBER"
        }
    });

    return{
        message:"Member added successfully"
    };

}


const getGroupMembers = async (groupId) => {

    const members = await prisma.groupMember.findMany({
        where: {
            groupId: Number(groupId)
        },
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    });

    return members;
};



const getGroup = async (groupId) => {

    return await prisma.group.findUnique({

        where: {

            id: Number(groupId)

        }

    });

};

module.exports = {
  createGroup,
  getMyGroups,
  addMember,
  getGroupMembers,
  getGroup
};