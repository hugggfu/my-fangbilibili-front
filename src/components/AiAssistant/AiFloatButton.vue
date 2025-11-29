<template>
  <div class="ai-float-button" @click="handleClick">
    <div class="ai-icon">
      <span class="robot-emoji">🤖</span>
    </div>
    <div class="ai-badge" v-if="unreadCount > 0">
      {{ unreadCount > 99 ? '99+' : unreadCount }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAiAssistantStore } from '@/stores/aiAssistantStore'

const aiStore = useAiAssistantStore()

const unreadCount = computed(() => aiStore.unreadCount)

const handleClick = () => {
  aiStore.toggleWindow()
}
</script>

<style lang="scss" scoped>
.ai-float-button {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: breathe 2s ease-in-out infinite;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
  }
  
  .ai-icon {
    .robot-emoji {
      font-size: 32px;
      color: #fff;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }
  }
  
  .ai-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4757;
    color: #fff;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 20px;
    text-align: center;
    font-weight: 500;
  }
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@media screen and (max-width: 768px) {
  .ai-float-button {
    right: 15px;
    bottom: 15px;
    width: 50px;
    height: 50px;
    
    .ai-icon .robot-emoji {
      font-size: 26px;
    }
  }
}
</style>
