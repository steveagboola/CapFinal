import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user){
    return res.json({message: "User already exists"})
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new UserModel ({username, password: hashedPassword});
  await newUser.save()

  res.json({message: "User reg Succ"});
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user){return res.json({message: "user does not exist"})}

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid){
    return res.json({message: "user password is incorrect"});
  }

  const token = jwt.sign({id: user.id}, "secret")
  res.json({token, userID: user.id})

});


export {router as userRouter};

// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;
      //Use function findone to find a user
//   const user = await UserModel.findOne({ username });
//   if (user) {
//     return res.status(400).json({ message: "Username already exists" });
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new UserModel({ username, password: hashedPassword });
//   await newUser.save();
//   res.json({ message: "User registered successfully" });
// });

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await UserModel.findOne({ username });

//   if (!user) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }
// //   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }
//   const token = jwt.sign({ id: user._id }, "secret");
//   res.json({ token, userID: user._id });
// });

// export { router as userRouter };

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     jwt.verify(authHeader, "secret", (err) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// export const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//       jwt.verify(authHeader, "secret", (err) => {
//         if (err) {
//           return res.sendStatus(403);
//         }
//         next();
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   };