<template>
  <div class="ai-chat-detail">
    <div v-if="!currentChatId" class="empty-chat">
      <div class="empty-icon">🤖</div>
      <div class="empty-title">选择或创建一个对话</div>
      <div class="empty-desc">开始与 AI 助手交流</div>
    </div>
    
    <template v-else>
      <!-- 快捷功能 -->
      <AiQuickActions />
      
      <!-- 消息列表 -->
      <div class="messages-container" ref="messagesContainer">
        <AiMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
        
        <AiTypingIndicator v-if="isTyping" />
      </div>
      
      <!-- 输入区域 -->
      <div class="input-container">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="💭 输入消息..."
          @keyup.enter="handleSend"
        />
        <el-button type="primary" @click="handleSend">发送</el-button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useAiAssistantStore } from '@/stores/aiAssistantStore'
import AiMessage from '@/components/AiAssistant/AiMessage.vue'
import AiQuickActions from '@/components/AiAssistant/AiQuickActions.vue'
import AiTypingIndicator from '@/components/AiAssistant/AiTypingIndicator.vue'

const aiStore = useAiAssistantStore()

const currentChatId = computed(() => aiStore.currentChatId)
const messages = computed(() => aiStore.messages)
const isTyping = computed(() => aiStore.isTyping)

const inputMessage = ref('')
const messagesContainer = ref(null)

const handleSend = () => {
  if (inputMessage.value.trim()) {
    aiStore.sendMessage(inputMessage.value)
    inputMessage.value = ''
  }
}

watch(messages, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}, { deep: true })
</script>

<style lang="scss" scoped>
.ai-chat-detail {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .empty-chat {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .empty-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }
    
    .empty-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    
    .empty-desc {
      color: #999;
      font-size: 14px;
    }
  }
  
  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #f8f9ff;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
      
      &:hover {
        background: #a8a8a8;
      }
    }
  }
  
  .input-container {
    padding: 20px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: 10px;
    
    input {
      flex: 1;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 10px 15px;
      font-size: 14px;
      outline: none;
      
      &:focus {
        border-color: #667eea;
      }
    }
  }
}
</style>
