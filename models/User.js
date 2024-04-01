import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: String,
});

userSchema.pre("save", async function () {
    //함수 안에 있는 this.password는 유저가 입력한 password를 말한다.
    /* suser의 password를 암호화시킨 다음에 저장하는 함수 */

    console.log("User password:", this.password);
    this.password = await bcrypt.hash(this.password, 5);
    console.log("Hashed password", this.password);
});

const User = mongoose.model("User", userSchema);
export default User;