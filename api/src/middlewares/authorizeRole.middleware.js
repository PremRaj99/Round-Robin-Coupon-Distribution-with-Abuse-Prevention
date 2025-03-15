export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Unauthorized role." });
    }

    next();
  };
};

class Role {
  static Admin = "admin";
  static User = "user";
  static Therapist = "therapist";

  static getAll() {
    return [Role.Admin, Role.Therapist, Role.User];
  }
}

export default Role;
