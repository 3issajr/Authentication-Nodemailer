import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "UnAuthorized - no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT);
    if (!decoded) {
      return res
        .status(400)
        .json({ success: false, message: "UnAuthorized - Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
