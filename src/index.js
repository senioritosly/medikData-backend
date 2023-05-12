import app from "./app.js"

const main = async () => {
    await app.listen(4000, () => {
        console.log('server has started on port 4000');
    });
}

main()