<template>
  <div class="blackbox-view">
    <div class="terry-with-box">
      <img src="../../../assets/blackbox/Terry.png" />
      <el-upload
        v-if="!is_used"
        class="blackbox"
        drag
        :disabled="isFetching"
        action="http://localhost:3003/graphql"     
        :show-file-list="false"
        :http-request="onPictureUpload"
        :on-success="onUploadSuccess"
      >
        {{isFetching ? 'Loading...' : '?'}}
      </el-upload> <!-- TODO: убрать урл в константы -->
    </div>
    <div v-if="is_used" class="drops">
      <img
        v-for="(name, index) in pictures.slice(0, 4)"
        :key="index"
        :class="{ drop: true, [`drop-${++index}`]: true }"
        :src="`http://localhost:3003/static/images/blackbox/${name}`"
      />
    </div>
  </div>
</template>


<script lang="ts">
  import { defineComponent } from "vue"
  import store from "@/store"

  export default defineComponent({
    props: {
      // TODO: заполнить
    },
    data() {
      return {
        isFetching: false
      }
    },
    beforeCreate() {
      if (store.state.user.blackbox.is_used && !store.state.user.blackbox.pictures.length) {
        store.dispatch('blackbox/getBlackboxPictures');
      }
    },
    computed: {
      is_used() {     
        return store.state.user.blackbox.is_used
      },
      pictures() {     
        return store.state.user.blackbox.pictures
      }
    },
    methods: {
      async onPictureUpload({file}: {file: Blob}) {
        const isJPG = file.type === 'image/jpeg'
        const isTooBig = file.size / 1024 / 1024 > 10

        if (!isJPG) {
          // this.$message.error('Avatar picture must be JPG format!')
          alert('Avatar picture must be JPG format!')
        }
        if (isTooBig) {
          // this.$message.error('Avatar picture size can not exceed 2MB!')
          alert('Avatar picture size can not exceed 10MB!')
        }
        if (isJPG && !isTooBig) {
          this.isFetching = true;

          const formData = new FormData();

          const query = `mutation AddBlackboxPicture($file:Upload!) {
            addBlackboxPicture(file:$file)
          }`;

          const operations = JSON.stringify({ query, variables: { file: null } });
          formData.append("operations", operations);

          const map = {
              "0": ["variables.file"]
          };

          formData.append("map", JSON.stringify(map));

          formData.append("0", file);

          await store.dispatch('blackbox/postBlackboxPicture', formData);
          // await postBlackboxPicture(formData)
        }

        return false
      },
      onUploadSuccess() {
        this.isFetching = false;

        store.dispatch('blackbox/getBlackboxPictures');
      },
      toggleMenu() {
        alert(1)
      }
    }
  })
</script>

<style scoped lang="scss">
  .blackbox-view {
    --terry-width: 45vw;
    --blackbox-width: calc(var(--terry-width) * 0.7);
    --blackbox-height: calc(var(--blackbox-width) / 2.24);
    --drop-width: calc((100vw - var(--terry-width)) / 2 - var(--body-offset) * 2);
    --drop-height: calc(50% - var(--body-offset) / 2);
    --start-drop-width: calc(var(--drop-width) / 2);
    --start-drop-height: calc(var(--drop-height) / 2);

    display: flex;
    justify-content: center;
    height: 100%;
    position: relative;

    .terry-with-box {
      position: relative;   

      img {
        width: var(--terry-width);
      }

      .blackbox {
        position: absolute;
        top: var(--blackbox-height);
        left: 51%;
        transform: translateX(-50%);
        height: var(--blackbox-height);
        width: var(--blackbox-width);
        /* background: rgb(15, 15, 15); */
        /* color: blanchedalmond; */
        text-align: center;
        line-height: var(--blackbox-height);
        font-size: 36px;
      }
    }

    .drops {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      .drop {
        position: absolute;
        animation-duration: 2s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }

      .drop-1 {       
        animation-name: first;
      }

      @keyframes first {
        0% {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: var(--start-drop-width);
          max-height: var(--start-drop-height);
        }

        100% {
          top: 0%;
          left: 0%;
          max-width: var(--drop-width);
          max-height: var(--drop-height);
        }
      }

      .drop-2 {
        animation-name: second;
      }

      @keyframes second {
        0% {
          top: 50%;
          right: 50%;
          transform: translate(-50%, 50%);
          max-width: var(--start-drop-width);
          max-height: var(--start-drop-height);
        }

        100% {
          top: 0%;
          right: 0%;
          max-width: var(--drop-width);
          max-height: var(--drop-height);
        }
      }

      .drop-3 {
        animation-name: third;
      }

      @keyframes third {
        0% {
          bottom: 50%;
          left: 50%;
          transform: translate(50%, -50%);
          max-width: var(--start-drop-width);
          max-height: var(--start-drop-height);
        }

        100% {
          bottom: 0%;
          left: 0%;
          max-width: var(--drop-width);
          max-height: var(--drop-height);
        }
      }

      .drop-4 {
        animation-name: fourth;
      }

      @keyframes fourth {
        0% {
          bottom: 50%;
          right: 50%;
          transform: translate(50%, 50%);
          max-width: var(--start-drop-width);
          max-height: var(--start-drop-height);
        }

        100% {
          bottom: 0%;
          right: 0%;
          max-width: var(--drop-width);
          max-height: var(--drop-height);
        }
      }
    }
  }
</style>

<style lang="scss">
  .blackbox-view {
    .el-upload {
      width: 100% !important;

      .el-upload-dragger {
        width: 100% !important;
        height: 100%;
        border-radius: 3px;
        background: rgb(15, 15, 15);
        color: blanchedalmond;
      }
    }
  }
</style>