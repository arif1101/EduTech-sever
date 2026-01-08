"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRoutes = void 0;
// enrollment.routes.ts
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const enrollment_controller_1 = require("./enrollment.controller");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.get("/my-courses", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), enrollment_controller_1.EnrollmentController.getMyEnrollments);
exports.EnrollmentRoutes = router;
//# sourceMappingURL=enrollment.routes.js.map