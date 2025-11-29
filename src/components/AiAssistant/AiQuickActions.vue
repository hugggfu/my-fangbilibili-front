<template>
  <div class="ai-quick-actions">
    <div class="action-btn" @click="handleAction('recommend')">
      <span class="icon">📺</span>
      <span class="text">推荐视频</span>
    </div>
    <div class="action-btn" @click="handleAction('faq')">
      <span class="icon">❓</span>
      <span class="text">常见问题</span>
    </div>
    <div class="action-btn" @click="handleAction('create')">
      <span class="icon">✍️</span>
      <span class="text">创作助手</span>
    </div>
    <div class="action-btn" @click="handleAction('analytics')">
      <span class="icon">📊</span>
      <span class="text">数据分析</span>
    </div>
  </div>
</template>

<script setup>
import { useAiAssistantStore } from '@/stores/aiAssistantStore'

const aiStore = useAiAssistantStore()

const handleAction = (action) => {
  const messages = {
    recommend: '推荐一些视频给我',
    faq: '有哪些常见问题？',
    create: '帮我优化视频标题',
    analytics: '分析我的数据'
  }
  
  aiStore.sendMessage(messages[action])
}
</script>

<style lang="scss" scoped>
.ai-quick-actions {
  display: flex;
  gap: 10px;
  padding: 15px 20px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  overflow-x: auto;
  
  .action-btn {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 10px 15px;
    background: #f8f9ff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: #e8ebff;
      transform: translateY(-2px);
    }
    
    .icon {
      font-size: 20px;
    }
    
    .text {
      font-size: 12px;
      color: #666;
      white-space: nowrap;
    }
  }
}
</style>
