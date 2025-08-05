const chatBody = document.querySelector('.chat-body');
const messageInput = document.querySelector('.message-input');
const sendBtn = document.getElementById('send-message');
const fileInput = document.getElementById('file-input');
const fileCancel = document.getElementById('file-cancel');
const toggler = document.getElementById('chatbot-toggler');
const closeBtn = document.getElementById('close-chatbot');

const API_KEY = 'YOUR_GEMINI_API_KEY';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

let userData = { message: null, file: {} };
let chatHistory = [];
const initHeight = messageInput.scrollHeight;

function createMessageElement(html, ...classes) {
  const div = document.createElement('div');
  div.classList.add('message', ...classes);
  div.innerHTML = html;
  return div;
}

async function generateBotResponse(messageDiv) {
  const userMsg = userData.message;
  chatHistory.push({ role: 'user', parts: [{ text: userMsg }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])] });
}