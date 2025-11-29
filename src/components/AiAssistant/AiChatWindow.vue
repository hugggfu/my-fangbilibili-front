<template>
  <div class="ai-chat-window" v-if="isWindowOpen" :class="{ minimized: isMinimized }">
    <!-- 标题栏 -->
    <div class="chat-header">
      <div class="header-left">
        <span class="ai-icon">🤖</span>
        <span class="title">AI 智能助手</span>
      </div>
      <div class="header-actions">
        <span class="action-btn" @click="handleMinimize">─</span>
        <span class="action-btn" @click="handleClose">✕</span>
      </div>
    </div>
    
    <!-- 快捷功能 -->
    <AiQuickActions v-if="!isMinimized" />
    
    <!-- 消息区域 -->
    <div class="chat-messages" v-if="!isMinimized" ref="messagesContainer">
      <div v-if="messages.length === 0" class="welcome-message">
        <div class="welcome-icon">🤖</div>
        <div class="welcome-text">你好！我是 EasyLive AI 助手</div>
        <div class="welcome-desc">有什么可以帮助你的吗？</div>
      </div>
      
      <AiMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
      
      <AiTypingIndicator v-if="isTyping" />
    </div>
    
    <!-- 输入区域 -->
    <div class="chat-input" v-if="!isMinimized">
      <input
        v-model="inputMessage"
        type="text"
        placeholder="💭 输入消息..."
        @keyup.enter="handleSend"
      />
      <div class="input-actions">
        <span class="action-icon" title="附件">📎</span>
        <span class="action-icon" title="语音">🎤</span>
        <span class="send-btn" @click="handleSend">发送</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useAiAssistantStore } from '@/stores/aiAssistantStore'
import AiMessage from './AiMessage.vue'
import AiQuickActions from './AiQuickActions.vue'
import AiTypingIndicator from './AiTypingIndicator.vue'

const aiStore = useAiAssistantStore()

const isWindowOpen = computed(() => aiStore.isWindowOpen)
const isMinimized = computed(() => aiStore.isMinimized)
const messages = computed(() => aiStore.messages)
const isTyping = computed(() => aiStore.isTyping)

const inputMessage = ref('')
const messagesContainer = ref(null)

const handleMinimize = () => {
  aiStore.toggleMinimize()
}

const handleClose = () => {
  aiStore.toggleWindow()
}

const handleSend = () => {
  if (inputMessage.value.trim()) {
    aiStore.sendMessage(inputMessage.value)
    inputMessage.value = ''
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>

<style lang="scss" scoped>
.ai-chat-window {
  position: fixed;
  right: 30px;
  bottom: 100px;
  width: 400px;
  height: 600px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &.minimized {
    height: 60px;
  }
  
  .chat-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      
      .ai-icon {
        font-size: 20px;
      }
      
      .title {
        font-size: 16px;
        font-weight: 500;
      }
    }
    
    .header-actions {
      display: flex;
      gap: 10px;
      
      .action-btn {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
        
        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
  
  .chat-messages {
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
    
    .welcome-message {
      text-align: center;
      padding: 40px 20px;
      
      .welcome-icon {
        font-size: 48px;
        margin-bottom: 10px;
      }
      
      .welcome-text {
        font-size: 18px;
        font-weight: 500;
        color: #333;
        margin-bottom: 5px;
      }
      
      .welcome-desc {
        font-size: 14px;
        color: #666;
      }
    }
  }
  
  .chat-input {
    border-top: 1px solid #e5e7eb;
    padding: 15px;
    background: #fff;
    
    input {
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
      
      &:focus {
        border-color: #667eea;
      }
    }
    
    .input-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      
      .action-icon {
        font-size: 18px;
        cursor: pointer;
        padding: 5px;
        margin-right: 10px;
        transition: transform 0.2s;
        
        &:hover {
          transform: scale(1.1);
        }
      }
      
      .send-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        padding: 8px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: opacity 0.2s;
        
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .ai-chat-window {
    right: 10px !important;
    bottom: 80px !important;
    width: calc(100vw - 20px) !important;
    height: calc(100vh - 100px) !important;
    
    &.minimized {
      height: 60px !important;
    }
  }
}
</style>
