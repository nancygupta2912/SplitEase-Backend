const groupService = require("../services/group.service");

const createGroup = async (req, res) => {
  try {
    const group = await groupService.createGroup(
      req.body,
      req.user.id
    );

    return res.status(201).json(group);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};


const getMyGroups = async (req, res) => {

    try {

        const groups = await groupService.getMyGroups(req.user.id);

        return res.status(200).json(groups);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

};


const addMember = async (req, res) => {

    try{

        const result = await groupService.addMember(

            req.params.groupId,

            req.body.email

        );

        return res.status(200).json(result);

    }

    catch(error){

        return res.status(500).json({
            error:error.message
        });

    }

}



const getGroupMembers = async (req, res) => {
    try {

        const members = await groupService.getGroupMembers(
            req.params.groupId
        );

        return res.status(200).json(members);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }
};



const getGroup = async (req, res) => {

    try {

        const group = await groupService.getGroup(
            req.params.groupId
        );

        return res.status(200).json(group);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {
  createGroup,
  getMyGroups,
  addMember,
  getGroupMembers,
  getGroup
};