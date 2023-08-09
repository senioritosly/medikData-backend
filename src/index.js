import app from "./app.js"
import dotenv from 'dotenv'
dotenv.config();

const port = process.env.PORT || 8080;
const main = async () => {
    await app.listen(port, () => {
        console.log(`server has started on port ${port}`);
    });
}

main()
