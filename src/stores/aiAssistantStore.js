import { defineStore } from 'pinia'
import { sendAiMessage, createAiChat, deleteAiChat, getAiChatHistory, getAiChatList } from '@/utils/AiApi'

export const useAiAssistantStore = defineStore('aiAssistant', {
    state: () => ({
        // 聊天窗口状态
        isWindowOpen: false,
        isMinimized: false,

        // 当前对话
        currentChatId: null,
        messages: [],

        // 对话列表
        chatList: [],

        // AI 状态
        isTyping: false,

        // 未读消息数
        unreadCount: 0,

        // 设置
        settings: {
            enableSound: true,
            enableNotification: true,
            theme: 'light'
        }
    }),

    actions: {
        // 打开/关闭聊天窗口
        toggleWindow() {
            this.isWindowOpen = !this.isWindowOpen
            if (this.isWindowOpen) {
                this.unreadCount = 0
            }
        },

        // 最小化/恢复窗口
        toggleMinimize() {
            this.isMinimized = !this.isMinimized
        },

        // 发送消息
        async sendMessage(content) {
            // 添加用户消息
            const userMessage = {
                id: Date.now(),
                type: 'user',
                content,
                timestamp: new Date()
            }
            this.messages.push(userMessage)

            // 显示 AI 正在输入
            this.isTyping = true

            // 调用后端 API
            const result = await sendAiMessage(content, this.currentChatId)

            this.isTyping = false

            if (result) {
                const aiMessage = {
                    id: result.id || Date.now() + 1,
                    type: 'ai',
                    content: result.content,
                    timestamp: new Date()
                }
                this.messages.push(aiMessage)

                // 如果是新对话，更新 ID
                if (result.chatId && !this.currentChatId) {
                    this.currentChatId = result.chatId
                    // 添加到对话列表
                    this.chatList.unshift({
                        id: result.chatId,
                        title: content.substring(0, 10) + '...',
                        lastMessage: result.content,
                        timestamp: new Date()
                    })
                } else if (this.currentChatId) {
                    // 更新现有对话列表
                    const chat = this.chatList.find(c => c.id === this.currentChatId)
                    if (chat) {
                        chat.lastMessage = result.content
                        chat.timestamp = new Date()

                        // 如果标题还是默认的"新对话"，则更新为用户发送的内容
                        if (chat.title === '新对话') {
                            chat.title = content.length > 10 ? content.substring(0, 10) + '...' : content
                        }
                    }
                }
            } else {
                // 处理错误
                this.messages.push({
                    id: Date.now() + 1,
                    type: 'system',
                    content: '发送失败，请稍后重试',
                    timestamp: new Date()
                })
            }
        },

        // 创建新对话
        async createNewChat() {
            const result = await createAiChat()
            if (result) {
                const newChat = {
                    id: result.sessionId,  // 后端返回的是 sessionId
                    title: result.title || '新对话',
                    lastMessage: '',
                    timestamp: new Date()
                }
                this.chatList.unshift(newChat)
                this.currentChatId = newChat.id
                this.messages = []
            }
        },

        // 切换对话
        async switchChat(chatId) {
            this.currentChatId = chatId
            this.messages = []

            // 从后端加载对话消息
            const history = await getAiChatHistory(chatId)
            if (history) {
                this.messages = history.map(msg => ({
                    id: msg.messageId,  // 后端返回的是 messageId
                    type: msg.role === 'user' ? 'user' : 'ai',  // 将 role 映射为 type
                    content: msg.content,
                    timestamp: new Date(msg.createTime)  // 后端返回的是 createTime
                }))
            }
        },

        // 删除对话
        async deleteChat(chatId) {
            const success = await deleteAiChat(chatId)
            if (success) {
                // 删除成功,立即更新前端列表
                this.chatList = this.chatList.filter(chat => chat.id !== chatId)
                if (this.currentChatId === chatId) {
                    this.currentChatId = null
                    this.messages = []
                }
            }
        },

        // 增加未读消息数
        incrementUnread() {
            if (!this.isWindowOpen) {
                this.unreadCount++
            }
        },

        // 加载对话列表
        async loadChatList() {
            const list = await getAiChatList()
            if (list) {
                this.chatList = list.map(chat => ({
                    id: chat.sessionId,  // 后端返回的是 sessionId,映射为 id
                    title: chat.title,
                    lastMessage: '',  // 后端暂时没有返回 lastMessage
                    timestamp: new Date(chat.updateTime)  // 使用 updateTime
                }))
            }
        }
    }
})
