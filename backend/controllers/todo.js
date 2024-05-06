import sendError from "../middleware/SendError.js";
import { User } from "../models/user.js";
import { Todo } from "../models/todo.js";

export const postTask = async (req, res, next) => {
  try {
    const { todo } = req.body;
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return sendError(res,400,"user not Found")
    };


   
    
    const createTodo = await Todo.create({
      todo: todo,
      createdBy: user.id,
    });

 return   res.status(200).json({
        message:"Todo Posted successfully",
        createTodo
    });

  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
     const user  = await User.findById(req.user.id);
   if (!user) {
    return  sendError(res,404,"User not found")
   };
   const AllTask = await Todo.find({createdBy:user.id});
   if (!AllTask) {
    sendError(res,404,"Task not Found")
   };


 return   res.status(200).json({
        message:"here is Your Tasks",
        AllTask
    });

  } catch (error) {
    next(error);
  }
};
