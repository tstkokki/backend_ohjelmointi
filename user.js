const express = require('express');


const userRouter = express.Router();
//relative path - actual path is decided using mount point
// where this routers is mounter on
userRouter.route('/');