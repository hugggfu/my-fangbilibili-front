import Request from "./Request"

const AiApi = {
    // 聊天相关
    sendMessage: "/ai/chat/send",
    getChatHistory: "/ai/chat/history",
    getChatList: "/ai/chat/list",
    createChat: "/ai/chat/create",
    deleteChat: "/ai/chat/delete",

    // 功能相关
    recommendVideo: "/ai/recommend/video",
    optimizeTitle: "/ai/content/optimizeTitle",
    suggestTags: "/ai/content/suggestTags",
    analyzeData: "/ai/analytics/analyze",
    smartSearch: "/ai/search/smart",
    getFAQ: "/ai/faq/list",
}

// 发送消息
const sendAiMessage = async (message, chatId = null) => {
    let result = await Request({
        url: AiApi.sendMessage,
        params: {
            message,
            chatId
        },
    })
    if (!result) {
        return null
    }
    return result.data
}

// 获取视频推荐
const getAiVideoRecommend = async (query) => {
    let result = await Request({
        url: AiApi.recommendVideo,
        params: { query },
    })
    if (!result) {
        return null
    }
    return result.data
}

// 优化标题
const optimizeVideoTitle = async (title) => {
    let result = await Request({
        url: AiApi.optimizeTitle,
        params: { title },
    })
    if (!result) {
        return null
    }
    return result.data
}

// 标签建议
const suggestVideoTags = async (title, description) => {
    let result = await Request({
        url: AiApi.suggestTags,
        params: { title, description },
    })
    if (!result) {
        return null
    }
    return result.data
}

// 数据分析
const analyzeUserData = async (timeRange = 'week') => {
    let result = await Request({
        url: AiApi.analyzeData,
        params: { timeRange },
    })
    if (!result) {
        return null
    }
    return result.data
}

export {
    AiApi,
    sendAiMessage,
    getAiVideoRecommend,
    optimizeVideoTitle,
    suggestVideoTags,
    analyzeUserData
}
