const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const QuestionTransform = require('./questionTransform')

app.use(express.static(path.join(__dirname, 'public')));
const urlencodedParser = express.urlencoded({extended: false});
app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
let total = 0
const answers = {
    "q1": {
        "counts": {}
    },
    "q2": {
        "counts": {}
    },
    "q3": {
        "counts": {}
    },
    "q4": {
        "counts": {}
    },
    "q5": {
        "counts": {}
    },
    "q6": {
        "counts": {}
    }
};


app.post('/hack', urlencodedParser, async(req, res) => {
    const { q1, q2, q3, q4, q5, q6 } = req.body;
// console.log(req.body)
    total++
    if (!answers["q1"].counts.hasOwnProperty(q1)) {

        answers["q1"].counts[q1] = 0;
    }

    answers["q1"].counts[q1]++;


    if (!answers["q2"].counts.hasOwnProperty(q2)) {

        answers["q2"].counts[q2] = 0;
    }

    answers["q2"].counts[q2]++;

    if (!answers["q3"].counts.hasOwnProperty(q3)) {

        answers["q3"].counts[q3] = 0;
    }

    answers["q3"].counts[q3]++;

    if (!answers["q4"].counts.hasOwnProperty(q4)) {

        answers["q4"].counts[q4] = 0;
    }

    answers["q4"].counts[q4]++;

    if (!answers["q5"].counts.hasOwnProperty(q5)) {

        answers["q5"].counts[q5] = 0;
    }

    answers["q5"].counts[q5]++;

    if (!answers["q6"].counts.hasOwnProperty(q6)) {

        answers["q6"].counts[q6] = 0;
    }
    answers["q6"].counts[q6]++;

// console.log(answers)
    // Відповідь з даними
    res.sendFile(path.join(__dirname, 'public', 'hack.html'));
});

app.get('/percentage', (req, res) => {

    const transformed = Object.entries(answers).map(([name, value]) => new QuestionTransform(value, total, name))
    res.json(transformed);
});

app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
});