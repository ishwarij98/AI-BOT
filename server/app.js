import readline from "readline-sync";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import chalk from "chalk";

async function apiCall() {


    let apiKey = process.env.API_KEY;

    let userInput = readline.question("Enter your Query : ")

    if (!apiKey) {
        console.log(chalk.red.bold("❌ API Key not found. Please check your .env file."));
        process.exit(1);
    }

    console.log(chalk.green.bold("✅ ChatGPT is running. Type 'exit' or 'bye' to stop.\n"));

    //// OpenAI Call using Axios

    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user", content: userInput
            }
        ]
    },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        }
    );
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content
}

console.log(`ChatGPT is running. Type EXIT to Stop.`)

while (true) {
    let userInput = readline.question("Enter your query : ");
    if (userInput == "exit" || userInput == "bye") {
        // console.log("Good Bye! See you later.");
        console.log(chalk.yellow.bold("\n👋 Good Bye! See you later.\n"));
        break;
    }
    const reply = await apiCall(userInput);

    if (reply) {
        // console.log(`AI : ${reply} : \n`)
        console.log(chalk.magentaBright.bold("\nsure here is the answer to your question:AI:\n") + chalk.white(reply) + "\n");
    }
}
apiCall();