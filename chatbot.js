//get the form and input element
const form = document.getElementById("chatbot-form");
const input = document.getElementById("chatbot-input");
const messagesContainer = document.getElementById("chatbot-messages");
const API_KEY = "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";





/* Toggle ChatBot */
var chatbotToggle = document.querySelector('.chatbot-toggle');
var chatbotContainer = document.querySelector('#chatbot-container');

chatbotToggle.addEventListener('click', function() {
    if (chatbotContainer.style.display === 'none') {
        chatbotToggle.innerHTML = '<img style="width: 25px" src="./img/close.png"></img>';
        chatbotContainer.style.display = 'block';
    } else {
        chatbotToggle.innerHTML = '<img style="width: 35px" src="./img/tchat.png"></img>';
        chatbotContainer.style.display = 'none';
    }
});

/* End */


//add event listener to the form
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    //get the value of the input
    let userInput = input.value;

    //display the message in the chatbot-messages container
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = userInput;
    messagesContainer.appendChild(userMessage);

    //clear the input
    input.value = "";

    if (userInput.toLowerCase() === "quit" || userInput.toLowerCase() === "exit") {
        return;
    }
    try {
        let response = await axios({
            method: "post",
            url: "https://api.openai.com/v1/completions",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            data: {
                "prompt": `chatbot : ${userInput}`,
                "temperature": 0.9,
                "max_tokens": 150,
                "top_p": 1,
                "frequency_penalty": 0,
                "presence_penalty": 0.6,
                "stop": [" Human:", " AI:"],
                "model": "text-davinci-003"
            }
        });
        let chatbotMessage = document.createElement("div");
        chatbotMessage.classList.add("chatbot-message-container");
        
        let botInfo = document.createElement("div");
        botInfo.classList.add("chatbot-info");
        
        let botProfile = document.createElement("img");
        botProfile.src = "./img/luna.png";
        botProfile.alt = "Bot Profile Picture";
        botInfo.appendChild(botProfile);
        
        let botName = document.createElement("p");
        botName.innerText = "Luna";
        botInfo.appendChild(botName);
        
        chatbotMessage.appendChild(botInfo);
        
        let botResponseContainer = document.createElement("div");
        botResponseContainer.classList.add("bot-response-container");
        
        let botResponse = document.createElement("p");
        botResponse.innerText = response.data.choices[0].text;
        botResponseContainer.appendChild(botResponse);
        
        chatbotMessage.appendChild(botResponseContainer);
        
        messagesContainer.appendChild(chatbotMessage);
        



        
        
    } catch (error) {
        console.error(error);
    }
});
