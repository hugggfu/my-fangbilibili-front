<template>
  <div class="ai-video-card">
    <div class="card-title" v-if="title">{{ title }}</div>
    <div class="video-list">
      <div 
        v-for="video in videos" 
        :key="video.videoId"
        class="video-item-wrapper"
      >
        <router-link :to="`/video/${video.videoId}`" target="_blank" class="video-link">
          <div class="video-item">
            <!-- 视频封面 -->
            <div class="video-cover">
              <img :src="video.videoCover" :alt="video.videoName" />
              <div class="video-duration">{{ video.duration }}</div>
            </div>
            
            <!-- 视频信息 -->
            <div class="video-info">
              <div class="video-title" v-html="video.videoName"></div>
              <div class="video-meta">
                <span class="author">{{ video.nickName }}</span>
                <span class="stats">
                  <i class="iconfont icon-play2"></i> {{ formatCount(video.playCount) }}
                  <i class="iconfont icon-danmu"></i> {{ formatCount(video.danmuCount) }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  videos: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})

// 格式化数字
const formatCount = (count) => {
  if (!count) return 0
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count
}
</script>

<style lang="scss" scoped>
.ai-video-card {
  margin-top: 12px;
  
  .card-title {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
    font-weight: 500;
  }
  
  .video-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .video-item-wrapper {
      .video-link {
        text-decoration: none;
        color: inherit;
        display: block;
      }
      
      .video-item {
        display: flex;
        gap: 12px;
        padding: 12px;
        background: #f8f9ff;
        border-radius: 8px;
        transition: all 0.3s;
        cursor: pointer;
        
        &:hover {
          background: #e8ebff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }
        
        .video-cover {
          position: relative;
          width: 160px;
          height: 90px;
          flex-shrink: 0;
          border-radius: 6px;
          overflow: hidden;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .video-duration {
            position: absolute;
            bottom: 4px;
            right: 4px;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 12px;
          }
        }
        
        .video-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          
          .video-title {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            
            // 高亮关键字样式
            :deep(.highlight) {
              color: #ff6699;
              font-weight: bold;
              background-color: rgba(255, 102, 153, 0.1);
              padding: 0 2px;
              border-radius: 2px;
            }
          }
          
          .video-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #999;
            
            .author {
              color: #666;
            }
            
            .stats {
              display: flex;
              gap: 12px;
              
              .iconfont {
                margin-right: 4px;
                
                &.icon-play2::before {
                  font-size: 14px;
                }
                
                &.icon-danmu::before {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .ai-video-card {
    .video-list {
      .video-item-wrapper {
        .video-item {
          .video-cover {
            width: 120px;
            height: 68px;
          }
        }
      }
    }
  }
}
</style>
