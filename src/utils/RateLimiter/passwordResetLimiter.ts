import rateLimit from "express-rate-limit";

export const passwordResetLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, //5 min
  max: 5, // limit each ip to 5 request per windowms
  message: "Too many requests, please try again after 10 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the x-ratelimit headers
});
