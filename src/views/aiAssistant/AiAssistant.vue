<template>
  <div class="ai-assistant-page">
    <div class="page-header">
      <h2>🤖 AI 智能助手</h2>
      <p>您的智能创作伙伴</p>
    </div>
    
    <div class="ai-content">
      <!-- 对话列表 -->
      <div class="chat-list-panel">
        <AiChatList />
      </div>
      
      <!-- 对话详情 -->
      <div class="chat-detail-panel">
        <AiChatDetail />
      </div>
    </div>
  </div>
</template>

<script setup>
import AiChatList from './AiChatList.vue'
import AiChatDetail from './AiChatDetail.vue'
</script>

<style lang="scss" scoped>
.ai-assistant-page {
  padding: 20px;
  
  .page-header {
    margin-bottom: 30px;
    
    h2 {
      font-size: 24px;
      margin-bottom: 5px;
      color: #333;
    }
    
    p {
      color: #666;
      font-size: 14px;
    }
  }
  
  .ai-content {
    display: flex;
    gap: 20px;
    height: calc(100vh - 200px);
    
    .chat-list-panel {
      width: 300px;
      flex-shrink: 0;
    }
    
    .chat-detail-panel {
      flex: 1;
    }
  }
}

@media screen and (max-width: 1024px) {
  .ai-assistant-page {
    .ai-content {
      flex-direction: column;
      height: auto;
      
      .chat-list-panel {
        width: 100%;
        height: 300px;
      }
      
      .chat-detail-panel {
        height: 500px;
      }
    }
  }
}
</style>
