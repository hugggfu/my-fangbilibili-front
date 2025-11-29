<template>
  <div class="ai-typing-indicator">
    <div class="typing-avatar">
      <span class="ai-avatar">🤖</span>
    </div>
    <div class="typing-dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ai-typing-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  .typing-avatar {
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
  
  .typing-dots {
    background: #fff;
    padding: 12px 20px;
    border-radius: 12px;
    display: flex;
    gap: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    .dot {
      width: 8px;
      height: 8px;
      background: #667eea;
      border-radius: 50%;
      animation: typing 1.4s infinite;
      
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
</style>
