import { NODE_ENV } from "../constant.js";

export const options = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: "None",
};
