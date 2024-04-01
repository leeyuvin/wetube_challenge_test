import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;
// app.get("/", logger, handleHome); //button.addEventListener("click", clickBtn)과 같다.
const handleListening = () => console.log(`Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);