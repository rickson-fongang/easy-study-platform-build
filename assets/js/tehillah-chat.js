class TehillahChat {
  constructor() {
    this.messages = [
      {
        id: "1",
        content:
          "Hi! I'm Tehillah, your AI study assistant. I'm here to help you learn effectively and answer any questions you have about the platform.",
        sender: "tehillah",
        timestamp: new Date(),
        type: "text",
      },
    ]
    this.isMinimized = true
    this.isListening = false
    this.isTyping = false
    this.context = "dashboard"
    this.userRole = "student"
    this.init()
  }

  init() {
    this.createChatWidget()
    this.setupEventListeners()
  }

  createChatWidget() {
    const chatWidget = document.createElement("div")
    chatWidget.id = "tehillahChatWidget"
    chatWidget.className = "tehillah-chat-widget hidden"
    chatWidget.innerHTML = this.getChatHTML()
    document.body.appendChild(chatWidget)
  }

  getChatHTML() {
    return `
      <div class="chat-container">
        <div class="chat-header">
          <div class="chat-avatar">
            <span>T</span>
          </div>
          <div class="chat-info">
            <h3>Tehillah AI</h3>
            <span class="chat-status">Online</span>
          </div>
          <div class="chat-controls">
            <button class="chat-minimize" id="minimizeChat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="4,14 10,14 10,20"/>
                <polyline points="20,10 14,10 14,4"/>
                <line x1="14" y1="10" x2="21" y2="3"/>
                <line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            </button>
            <button class="chat-close" id="closeChat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="chat-messages" id="chatMessages">
          ${this.renderMessages()}
        </div>
        <div class="chat-input-container">
          <input type="text" id="chatInput" placeholder="Ask me anything about your studies..." />
          <button id="voiceToggle" class="voice-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
          <button id="sendMessage" class="send-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22,2 15,22 11,13 2,9 22,2"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="chat-fab hidden" id="chatFab">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <circle cx="12" cy="17" r="1"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      </div>
    `
  }

  renderMessages() {
    return this.messages
      .map(
        (message) => `
      <div class="message ${message.sender}">
        <div class="message-avatar">${message.sender === "user" ? "U" : "T"}</div>
        <div class="message-content">
          ${message.type && message.type !== "text" ? `<span class="message-badge ${message.type}">${message.type}</span>` : ""}
          <p>${message.content}</p>
          <span class="message-time">${message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
    `,
      )
      .join("")
  }

  setupEventListeners() {
    const widget = document.getElementById("tehillahChatWidget")
    const fab = widget.querySelector("#chatFab")
    const minimizeBtn = widget.querySelector("#minimizeChat")
    const closeBtn = widget.querySelector("#closeChat")
    const sendBtn = widget.querySelector("#sendMessage")
    const chatInput = widget.querySelector("#chatInput")
    const voiceBtn = widget.querySelector("#voiceToggle")

    fab.addEventListener("click", () => this.openChat())
    minimizeBtn.addEventListener("click", () => this.minimizeChat())
    closeBtn.addEventListener("click", () => this.closeChat())
    sendBtn.addEventListener("click", () => this.sendMessage())
    voiceBtn.addEventListener("click", () => this.toggleVoice())

    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage()
    })
  }

  openChat() {
    const widget = document.getElementById("tehillahChatWidget")
    const container = widget.querySelector(".chat-container")
    const fab = widget.querySelector("#chatFab")

    widget.classList.remove("hidden")
    container.classList.remove("hidden")
    fab.classList.add("hidden")
    this.isMinimized = false
    this.scrollToBottom()
  }

  minimizeChat() {
    const widget = document.getElementById("tehillahChatWidget")
    const container = widget.querySelector(".chat-container")
    const fab = widget.querySelector("#chatFab")

    container.classList.add("hidden")
    fab.classList.remove("hidden")
    this.isMinimized = true
  }

  closeChat() {
    const widget = document.getElementById("tehillahChatWidget")
    widget.classList.add("hidden")
    this.isMinimized = true
  }

  async sendMessage() {
    const input = document.getElementById("chatInput")
    const message = input.value.trim()

    if (!message) return

    // Add user message
    this.addMessage(message, "user")
    input.value = ""

    // Show typing indicator
    this.showTyping()

    try {
      const response = await window.EasyStudy.apiCall("/chat/tehillah.php", "POST", {
        message: message,
        context: this.context,
        user_role: this.userRole,
      })

      this.hideTyping()

      if (response.success && response.reply) {
        this.addMessage(response.reply, "tehillah", response.type || "text")
      } else {
        const fallbackResponse = this.generateFallbackResponse(message)
        this.addMessage(fallbackResponse.content, "tehillah", fallbackResponse.type)
      }
    } catch (error) {
      console.error("[v0] Tehillah chat error:", error)
      this.hideTyping()
      this.addMessage("I'm having trouble connecting right now. Please try again later.", "tehillah")
    }
  }

  addMessage(content, sender, type = "text") {
    const message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      type,
    }

    this.messages.push(message)
    this.updateMessagesDisplay()
    this.scrollToBottom()
  }

  updateMessagesDisplay() {
    const messagesContainer = document.getElementById("chatMessages")
    messagesContainer.innerHTML = this.renderMessages()
  }

  showTyping() {
    const messagesContainer = document.getElementById("chatMessages")
    const typingDiv = document.createElement("div")
    typingDiv.id = "typingIndicator"
    typingDiv.className = "message tehillah typing"
    typingDiv.innerHTML = `
      <div class="message-avatar">T</div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `
    messagesContainer.appendChild(typingDiv)
    this.scrollToBottom()
  }

  hideTyping() {
    const typingIndicator = document.getElementById("typingIndicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }
  }

  generateFallbackResponse(input) {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("progress") || lowerInput.includes("analytics")) {
      return {
        content:
          "Based on your recent activity, you've completed 75% of your current courses! You're doing great. I recommend focusing on the JavaScript fundamentals video next - it will help with your upcoming assignment.",
        type: "analytics",
      }
    }

    if (lowerInput.includes("help") || lowerInput.includes("how")) {
      return {
        content:
          "I can help you with study planning, explain concepts, track your progress, or answer questions about using the platform. What specific area would you like help with?",
        type: "suggestion",
      }
    }

    if (lowerInput.includes("study") || lowerInput.includes("learn")) {
      return {
        content:
          "Here are some personalized study tips: 1) Take breaks every 25 minutes (Pomodoro technique), 2) Review your notes within 24 hours, 3) Practice active recall by testing yourself. Would you like me to create a study schedule for you?",
        type: "suggestion",
      }
    }

    return {
      content: `I understand you're asking about ${input}. Let me help you with that! Could you provide a bit more context so I can give you the most relevant assistance?`,
      type: "text",
    }
  }

  toggleVoice() {
    this.isListening = !this.isListening
    const voiceBtn = document.getElementById("voiceToggle")

    if (this.isListening) {
      voiceBtn.classList.add("listening")
      // Voice recognition would be implemented here
    } else {
      voiceBtn.classList.remove("listening")
    }
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById("chatMessages")
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  setContext(context, userRole = "student") {
    this.context = context
    this.userRole = userRole
  }
}

// Global Tehillah functions
window.TehillahChat = TehillahChat
window.tehillahInstance = null

function initTehillah(context = "dashboard", userRole = "student") {
  if (!window.tehillahInstance) {
    window.tehillahInstance = new TehillahChat()
  }
  window.tehillahInstance.setContext(context, userRole)
}

function openTehillahChat() {
  if (window.tehillahInstance) {
    window.tehillahInstance.openChat()
  } else {
    initTehillah()
    window.tehillahInstance.openChat()
  }
}

function closeTehillahChat() {
  if (window.tehillahInstance) {
    window.tehillahInstance.closeChat()
  }
}
