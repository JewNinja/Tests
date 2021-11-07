<template>
  <el-card class="card-container">
    <h2>Тестотека</h2>
    <!-- <p v-for="(test, tIndex) in tests.data" :key="tIndex">{{test.title}}</p> -->
    <el-table :data="tests.data.filter(test => {
      return !search
        || test.title.toLowerCase().includes(search.toLowerCase())
        || test.name.toLowerCase().includes(search.toLowerCase())
    })">
      <el-table-column
        label="Название"
        prop="title">
      </el-table-column>
      <el-table-column
        align="right">
        <template #header>
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"/>
        </template>
        <template #default="scope">
          <el-button size="mini" @click="onEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="onDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>


<script lang="ts">
import { ITest } from "@/models"
import router from "@/router"
import store from "@/store"
import { defineComponent } from "vue"

  export default defineComponent({
    data() {
      return {
        search: '',
      }
    },
    computed: {
      tests() { // @ts-ignore
        return store.state.tests
      },
    },
    methods: {
      onEdit(row: ITest) {
        // router.push({ path: `/tests/_create` })
        // router.push({ path: '/tests/_edit', params: { id: row._id } })
        router.push({ name: 'TestEditing', params: { id: row._id } })
      },
      onDelete(row: ITest) {
        // @ts-expect-error
        this.$confirm('Вы уверены что хотите удалить тест?', 'Удаление', {
          customClass: 'modal-delete',
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          confirmButtonClass: 'modal-delete-btn',
          type: 'warning'
        }).then(() => {
          store.dispatch('tests/deleteTest', row._id).then(res => {
          if (res === false) {
            // @ts-expect-error
            this.$notify.error({
              title: 'Ошибка',
              message: 'Тест не был удалён'
            });
          }
        })
        })
      },
    },
    watch: {
    
    },
  })
</script>

<style scoped>
  .card-container {
    margin: 0 10px;
    flex: 1;
    /* min-width: 180px; */
    text-align: center;
  }
</style>
<style lang="scss">
  .is-message-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

  .modal-delete {
    box-shadow: 0 0 5px rgba(0,0,0,0.3) !important;

    .modal-delete-btn {
        background: #F56C6C !important;
        border-color: #F56C6C !important;
      }
      .modal-delete-btn:hover {
        background: #F78989 !important;
        border-color: #F78989 !important;
      }
    }
  }
</style>