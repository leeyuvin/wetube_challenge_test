import express from "express";
import morgan from "morgan"; //이름이 같을 필요는 없다. from만 정확하면 된다.
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";


//express라는 어플리케이션 생성 코드
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
//app.locals.basedir = process.cwd();
app.use(logger);
app.use(express.urlencoded({ extended: true }));

//백엔드(localhost)에 정보를 제공 * 쿠키 * 브라우저가 명령하는 행동
app.use(
    session({
        secret: "Hello!",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

export default app;