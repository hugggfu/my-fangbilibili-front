<template>
  <div class="ai-chat-list">
    <div class="list-header">
      <el-button type="primary" @click="handleNewChat" class="new-chat-btn">
        <span class="btn-icon">➕</span>
        新建对话
      </el-button>
    </div>
    
    <div class="chat-items">
      <div
        v-for="chat in chatList"
        :key="chat.id"
        class="chat-item"
        :class="{ active: chat.id === currentChatId }"
        @click="handleSelectChat(chat.id)"
      >
        <div class="chat-info">
          <div class="chat-title">{{ chat.title }}</div>
          <div class="chat-preview">{{ chat.lastMessage }}</div>
        </div>
        <div class="chat-actions">
          <span class="delete-btn" @click.stop="handleDelete(chat.id)">🗑️</span>
        </div>
      </div>
      
      <div v-if="chatList.length === 0" class="empty-state">
        <div class="empty-icon">💬</div>
        <div class="empty-text">暂无对话</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAiAssistantStore } from '@/stores/aiAssistantStore'

const aiStore = useAiAssistantStore()

const chatList = computed(() => aiStore.chatList)
const currentChatId = computed(() => aiStore.currentChatId)

const handleNewChat = () => {
  aiStore.createNewChat()
}

const handleSelectChat = (chatId) => {
  aiStore.switchChat(chatId)
}

const handleDelete = (chatId) => {
  aiStore.deleteChat(chatId)
}
</script>

<style lang="scss" scoped>
.ai-chat-list {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .list-header {
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
    
    .new-chat-btn {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      
      .btn-icon {
        margin-right: 5px;
      }
    }
  }
  
  .chat-items {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    
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
    
    .chat-item {
      padding: 15px;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 10px;
      transition: all 0.2s;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      &:hover {
        background: #f8f9ff;
      }
      
      &.active {
        background: #e8ebff;
      }
      
      .chat-info {
        flex: 1;
        
        .chat-title {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        
        .chat-preview {
          font-size: 12px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      
      .chat-actions {
        .delete-btn {
          opacity: 0;
          transition: opacity 0.2s;
          cursor: pointer;
          font-size: 16px;
        }
      }
      
      &:hover .delete-btn {
        opacity: 1;
      }
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      
      .empty-icon {
        font-size: 48px;
        margin-bottom: 10px;
      }
      
      .empty-text {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>
