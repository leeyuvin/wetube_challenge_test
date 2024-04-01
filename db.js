import mongoose from "mongoose";

// 서버와 database서버 사이의 현재 connection에 엑세스 가능
mongoose.connect("mongodb://127.0.0.1:27017/wetube");

const db = mongoose.connection;

const handleOpen = () => console.log("🌍 Connected to DB");
db.on("error", (error) => console.log("❌ DB Error", error));
db.once("open", handleOpen);