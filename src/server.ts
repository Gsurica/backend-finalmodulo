import { app } from "./app";

const DOOR = process.env.PORT || 3333;

app.listen(DOOR, () => console.log(`Server starter on port ${DOOR}`));