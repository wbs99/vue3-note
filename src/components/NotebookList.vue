<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"
        ><i class="iconfont icon-plus"></i> 新建笔记本</a
      >
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ state.notebooks.length }})</h3>
        <div class="book-list">
          <router-link
            v-for="notebook in state.notebooks"
            to="/note/1"
            class="notebook"
          >
            <div>
              <span class="iconfont icon-notebook"></span> {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)"
                >编辑</span
              >
              <span class="action" @click.stop.prevent="onDelete(notebook)"
                >删除</span
              >
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Api from "@/api/index";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { friendlyDate } from "@/helpers/utils";

const router = useRouter();
let state = reactive({
  notebooks: <Notebook[]>[],
});
onMounted(() => {
  getUserInfo();
  getAllBooks();
});

function getUserInfo() {
  Api.getInfo().then(res => {
    if (!res.data.isLogin) {
      router.push({ path: "/login" });
    }
  });
}
function getAllBooks() {
  Api.getAll().then((res: any) => {
    state.notebooks = res.data;
  });
}
function onCreate() {
  let title = window.prompt("创建笔记本");
  if (title.trim() === "") {
    return alert("笔记本名不能为空");
  }
  Api.addNotebook({ title }).then(res => {
    console.log(res);
    res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
    state.notebooks.unshift(res.data.data);
    alert(res.data.msg);
  });
}
function onEdit(notebook: Notebook) {
  let title = window.prompt("修改标题", notebook.title);
  Api.updateNotebook(notebook.id, { title }).then(res => {
    console.log(res);
    notebook.title = title;
    alert(res.data.msg);
  });
}
function onDelete(notebook: Notebook) {
  const isConfirm = window.confirm("你确定要删除吗?");
  if (isConfirm) {
    Api.deleteNotebook(notebook.id).then(res => {
      state.notebooks.splice(state.notebooks.indexOf(notebook), 1);
      alert(res.data.msg);
    });
  }
}
</script>

<style lang="scss" scoped>
#notebook-list {
  flex: 1;

  .btn {
    font-size: 12px;
    color: #666;
    cursor: pointer;
    margin-left: 10px;
  }
  .btn .iconfont {
    font-size: 12px;
  }

  input {
    width: 300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px 5px;
    outline: none;
  }

  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }

  main {
    padding: 30px 40px;
  }
  .layout {
    max-width: 966px;
    margin: 0 auto;
  }

  main h3 {
    font-size: 12px;
    color: #000;
  }

  main .book-list {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
  }
  main .book-list span {
    font-size: 12px;
    font-weight: bold;
    color: #b3c0c8;
  }
  main .date,
  main .action {
    float: right;
    margin-left: 10px;
  }
  main .iconfont {
    color: #1687ea;
    margin-right: 4px;
  }
  main .notebook {
    display: block;
    cursor: pointer;
  }
  main a.notebook:hover {
    background-color: #f7fafd;
  }

  main a.notebook div {
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }

  main .error-msg {
    font-size: 12px;
    color: red;
  }
}
</style>
