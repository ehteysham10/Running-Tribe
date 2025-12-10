import { MEMBERSHIP } from "../constants/membershipConstant.js";

export const requirePremiumForFeature = (req, res, next) => {
  if (req.user.membership === "premium") return next();
  return res.status(403).json({ message: "Upgrade to premium to access this feature" });
};
