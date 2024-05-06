import express from "express";
import cors from "cors";
import { DbConnect } from "./db/db.js";
import { errorHandler } from "./middleware/error.js";
import UserRouter from "./routes/user.js";
import TaskRouter from "./routes/todo.js";


const app = express();
DbConnect();
app.use(cors({
  origin:"http://localhost:5173",
  methods:['GET','POST','DELETE','PUT']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

// routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/task", TaskRouter);
app.post('/test' ,(req,res)=>{
   
  res.json({
    message:"cookie set"
  })
});

app.listen(6969, () => {
  console.log("server is runnig on 6969");
});
