import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
    const pageTitle = "Join";
    const { name, username, email, password1, password2, location } = req.body;
    if (password1 !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "비밀번호가 서로 일치하지 않습니다."
        });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "이미 사용중인 아이디/이메일입니다.",
        });
    }
    try {
        await User.create({
            name,
            username,
            email,
            password1,
            password2,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render(
            "join",
            {
                pageTitle: "Join",
                errorMessage: error._message,
            });
    }
};
export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username });
    // check if account exists
    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "입력한 아이디를 가진 사용자가 존재하지 않습니다.",
        });
    }
    // check if password correct
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "비밀번호를 다시 확인해주세요.",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit Uesr");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See");
