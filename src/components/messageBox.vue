<template>
  <transition name="confirm-fade">
    <div v-if="isShow" class="my-confirm" @click.stop="cancel">
      <div class="confirm-content-wrap" @click.stop>
        <h3 class="my-confirm-title">{{ titleText }}</h3>
        <p class="my-confirm-content">{{ msg }}</p>
        <div class="my-operation">
          <div class="my-cancel-btn" @click="cancel">
            <p class="my-btn-text my-border-right">{{ cancelText }}</p>
          </div>
          <div class="confirm-btn" @click="confirm">
            <p class="my-btn-text">{{ confirmText }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isShow: false, // 用于控制整个窗口的显示/隐藏
        titleText: '操作提示', // 提示框标题
        msg: 'Say Something ...', // 提示框的内容
        cancelText: '取消', // 取消按钮的文字
        confirmText: '确认', // 确认按钮的文字
        userFunc: function () {},
        that:null
      }
    },
    methods: {
      cancel() {
        this.reset()
      },
      confirm() {
        this.userFunc && this.userFunc.call(this.that)
        this.reset()
      },
      reset() {
        this.isShow = false
        this.titleText = '操作提示'
        this.cancelText = '取消'
        this.confirmText = '确认'
      }
    },
  }
</script>

<style scoped>
  .my-confirm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    /* 这里防止当用户长按屏幕，出现的黑色背景色块，以及 iPhone 横平时字体的缩放问题 */
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* 进入和出去的动画 */
  .confirm-fade-enter-active {
    animation: opacity 0.3s;
  }

  .confirm-fade-enter-active .confirm-content-wrap {
    animation: scale 0.3s;
  }

  .confirm-fade-leave-active {
    animation: outOpacity 0.2s;
  }

  /* 包裹层容器样式 */
  .confirm-content-wrap {
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    width: 280px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 5px;
    z-index: 999;
    user-select: none;
  }

  /* 顶部标题部分 */
  .my-confirm-title {
    padding-top: 16px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: #333;
    margin-bottom: 15px;
  }

  /* 中间内容部分 */
  .my-confirm-content {
    padding: 0 15px;
    padding-top: 20px;
    margin-bottom: 30px;
    text-align: center;
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  }

  /* 底部按钮样式 */
  .my-operation {
    display: flex;
    border-top: 1px solid #eee;
  }

  .my-operation .my-cancel-btn,
  .confirm-btn {
    flex: 1;
  }

  .my-cancel-btn {
    border-right: 1px solid #eee;

  }

  .my-operation .confirm-btn {
    color: #ffb000;
  }

  .my-operation .my-btn-text {
    text-align: center;
    font-size: 16px;
    margin: 14px 0;
    padding: 6px 0;
  }

  /* 进来的动画 */
  @keyframes opacity {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes scale {
    0% {
      transform: scale(0);
    }

    60% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

  /* 出去的动画 */
  @keyframes outOpacity {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
</style>