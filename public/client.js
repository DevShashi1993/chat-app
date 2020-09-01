const socket = io();

let textarea = document.querySelector("#textarea");
let messagearea = document.querySelector(".message__area");

let name;
do {
  name = prompt("please enter your name");
} while (!name);

const appendmessage = (msg, type) => {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `<h4>${msg.user}</h4>
                  <p>${msg.message}</p>`;

    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);
}

const sendmessage = (message) => {
    let msg  = {
        user : name,
        message : message.trim()
    }

    appendmessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // send message to server
    socket.emit('message', msg);
}

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter') {
        sendmessage(e.target.value)
    }
});

// Recieve message to server
socket.on('message', (msg) => {
    appendmessage(msg, 'incoming');
    scrollToBottom();
});


const scrollToBottom = () => {
    messagearea.scrollTop = messagearea.scrollHeight;
}