import OpenAI from "openai";
import { OPEN_API_KEY, USER_PROMPTS1, USER_PROMPTS2, LLM_PROMPT} from './helper.js';
import mysql from 'mysql2';

const openai = new OpenAI({apiKey: OPEN_API_KEY});

let USER_PROMPTS= USER_PROMPTS2

let Queries= []
// get SQL queries 
for (let i = 0; i < USER_PROMPTS.length; i++) 
{
    
    console.log((i+1)+": "+ USER_PROMPTS[i])
    
    // make into func, run all questions in the func
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: LLM_PROMPT },
            {
                role: "user",
                content: USER_PROMPTS[i],
            },
        ],
    });

    console.log(completion.choices[0].message.content);
    Queries.push(completion.choices[0].message.content)
    
}

async function getSQLQueriesFromPrompts(USER_PROMPTS, LLM_PROMPT, OPEN_API_KEY) {
    const res = [];

    const openai = new OpenAI({ apiKey: OPEN_API_KEY });

    for (let i = 0; i < USER_PROMPTS.length; i++) {
        console.log(`${i} ${USER_PROMPTS[i]}`);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: LLM_PROMPT },
                { role: "user", content: USER_PROMPTS[i] },
            ],
        });

        const message = completion.choices[0].message.content;
        console.log(message);
        res.push(message);
    }

    return res;
}


function runQueries(commands)
{

    // Create connection
    const con = mysql.createConnection({
    host: 'sql3.freesqldatabase.com',
    user: 'sql3785614',
    password: 'srlxG2tPQs',
    database: 'sql3785614'
    });

    // iteratively run queries 
    con.connect(function(err) {
    if (err) throw err;

    let completed = 0;
    for (let i = 0; i < commands.length; i++) {
        con.query(commands[i], function (err, result, fields) {
            if (err) {
                console.error(`Result for Query ${i + 1}: INVALID QUERY COMMAND`);
                console.error(`Error: ${err.message}`);
            } else {
                console.log(`Result for Query ${i + 1}:`, result);
            }

            completed++;
            if (completed === commands.length) {
                con.end((err) => {
                    if (err) console.error("Error closing the connection:", err.message);
                    else console.log("All queries done. Connection closed.");
                });
            }
        });
    }
    });

}

runQueries(Queries)
