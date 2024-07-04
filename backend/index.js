import express from 'express'
import cors from 'cors'
import { formatData, query } from './utils/helper.js';

const app = express()
app.use(cors(
    {
        origin: '*'

    }
));
app.get('/', (req, res) => {
    res.json({
        "Message": "Hello World"
    })
})

function getData(req, res) {
    let user = req.params.id;
    fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        },
        body: JSON.stringify({ query: query, variables: { username: user } }),

    })
        .then(result => result.json())

        .then(data => {
            if (data.errors) {
                res.status(404).send({
                    "message" : "No user Found"
                })
            } else {
                res.send(formatData(data.data));
            }
        })
        .catch(err => {
            console.error('Error', err);
            res.send(err);
        });
}




app.get('/:id', getData);
app.listen(3000, () => {
    console.log('Listening on PORT 3000')
})