<template>
  <div class="ai-message" :class="message.type">
    <div class="message-avatar">
      <Avatar
        v-if="message.type === 'user'"
        :avatar="userAvatar"
        :userId="userId"
        :width="32"
      />
      <span v-else class="ai-avatar">🤖</span>
    </div>
    <div class="message-content">
      <div class="message-text">{{ message.content }}</div>
      <div class="message-time">{{ formatTime(message.timestamp) }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLoginStore } from '@/stores/loginStore'
import moment from 'moment'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const loginStore = useLoginStore()
const userAvatar = computed(() => loginStore.userInfo.avatar)
const userId = computed(() => loginStore.userInfo.userId)

const formatTime = (timestamp) => {
  return moment(timestamp).format('HH:mm')
}
</script>

<style lang="scss" scoped>
.ai-message {
  display: flex;
  margin-bottom: 20px;
  
  &.user {
    flex-direction: row-reverse;
    
    .message-content {
      align-items: flex-end;
      
      .message-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
      }
    }
  }
  
  .message-avatar {
    flex-shrink: 0;
    margin: 0 10px;
    
    .ai-avatar {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      font-size: 18px;
    }
  }
  
  .message-content {
    display: flex;
    flex-direction: column;
    max-width: 70%;
    
    .message-text {
      background: #fff;
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.5;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      word-wrap: break-word;
    }
    
    .message-time {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      padding: 0 5px;
    }
  }
}
</style>
