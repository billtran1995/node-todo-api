console.log("NODE_ENV", process.env.NODE_ENV);
var env =
  (process.env.NODE_ENV !== undefined
    ? process.env.NODE_ENV.trim()
    : process.env.NODE_ENV) || "development";
console.log("env: ", env);

if (env === "development") {
  process.env.PORT = 4000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
} else if (env === "test") {
  process.env.PORT = 4000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}
