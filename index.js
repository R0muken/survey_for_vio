const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const QuestionTransform = require('./questionTransform')
app.set('view engine', 'ejs');

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
    let q1 = []
    let q2 = []
    let q3 = []
    let q4 = []
    let q5 = []
    let q6 = []

    transformed[0]["q1"].forEach(obj => {
        for (let key in obj) {
            q1.push(`${key}: ${obj[key]}`)
        }
    })
    transformed[1]["q2"].forEach(obj => {
        for (let key in obj) {
            q2.push(`${key}: ${obj[key]}`)
        }
    })
    transformed[2]["q3"].forEach(obj => {
        for (let key in obj) {
            q3.push(`${key}: ${obj[key]}`)
        }
    })
    transformed[3]["q4"].forEach(obj => {
        for (let key in obj) {
            q4.push(`${key}: ${obj[key]}`)
        }
    })
    transformed[4]["q5"].forEach(obj => {
        for (let key in obj) {
            q5.push(`${key}: ${obj[key]}`)
        }
    })
    transformed[5]["q6"].forEach(obj => {
        for (let key in obj) {
            q6.push(`${key}: ${obj[key]}`)
        }
    })
    res.render(path.join(__dirname, 'public', 'percentage.ejs', ), { q1: q1, q2: q2, q3: q3, q4: q4, q5:q5, q6: q6});
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server successfully running on port 8080");
});