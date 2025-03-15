import { PORT } from "./constant.js";

import app from "./app.js";
import connectDB from "./config/connectDB.js";

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
