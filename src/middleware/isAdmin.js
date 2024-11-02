export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed to the next middleware/route
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
