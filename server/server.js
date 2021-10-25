const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;

app.get('/', (req, res)=>{
    res.send(`welcome to my react`);
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}...`)
});