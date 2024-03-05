class QuestionTransform{

    constructor(question, total, name) {
        this[name] = Object.entries(question.counts).map(([name, value]) => ({ [name] : `${Math.round(value / total * 100)}%`}))
    }
}

module.exports = QuestionTransform