import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 min
  max: 3, // limit each ip to 3 request per windowms
  message: "Too many requests, please try again after 5 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the x-ratelimit headers
});
