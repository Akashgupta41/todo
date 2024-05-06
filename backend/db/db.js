import mongoose from "mongoose";

export const DbConnect = async () => {
 try {
   mongoose
     .connect("mongodb://localhost:27017", {
       dbName: "MY_TASK",
     })
     .then(() => {
       console.log("Db connected successfully");
     })
     .catch((err) => {
       console.log(err);
     });
 } catch (error) {
  console.log(error);
 }
};

