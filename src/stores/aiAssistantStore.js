import { defineStore } from 'pinia'

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

            // TODO: 调用后端 API
            // const response = await sendAiMessage(content, this.currentChatId)

            // 模拟 AI 回复
            setTimeout(() => {
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    content: '你好！我是 EasyLive AI 助手。目前我还在学习中，后续会为你提供更智能的服务。你可以问我关于平台使用、视频推荐、创作建议等问题。',
                    timestamp: new Date()
                }
                this.messages.push(aiMessage)
                this.isTyping = false

                // 更新对话列表
                if (this.currentChatId) {
                    const chat = this.chatList.find(c => c.id === this.currentChatId)
                    if (chat) {
                        chat.lastMessage = content
                        chat.timestamp = new Date()
                    }
                }
            }, 1000)
        },

        // 创建新对话
        createNewChat() {
            const newChat = {
                id: Date.now(),
                title: '新对话',
                lastMessage: '',
                timestamp: new Date()
            }
            this.chatList.unshift(newChat)
            this.currentChatId = newChat.id
            this.messages = []
        },

        // 切换对话
        switchChat(chatId) {
            this.currentChatId = chatId
            // TODO: 从后端加载对话消息
            // 目前清空消息列表
            this.messages = []
        },

        // 删除对话
        deleteChat(chatId) {
            this.chatList = this.chatList.filter(chat => chat.id !== chatId)
            if (this.currentChatId === chatId) {
                this.currentChatId = null
                this.messages = []
            }
        },

        // 增加未读消息数
        incrementUnread() {
            if (!this.isWindowOpen) {
                this.unreadCount++
            }
        }
    }
})
