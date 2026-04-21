// import express from "express";
// import auth from "../middleware/auth.js";
// import { placeOrder } from "../controllers/orderController.js";
// // import { protect } from '../middlewares/authMiddleware.js';


// const orderRouter = express.Router();
// orderRouter.post("/place",auth,placeOrder);
// // orderRouter.use(authMiddleware);

// export default orderRouter;

import express from "express";
import auth from "../middleware/auth.js";  // Changed from middlewares to middleware
import { placeOrder, listOrders, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/status", updateStatus);
orderRouter.get("/list", listOrders);
orderRouter.post("/userorders", auth, userOrders);
orderRouter.post("/verify", verifyOrder);

export default orderRouter;