<template>
<div class="container">
  <the-head/>
  <main>
    <div class="graph-row">
      <div class="graph-row-col">
        <div class="graph-title">
          <p>前端代码错误分析（今日数据从00:00:00统计）</p>
        </div>
        <div class="graph-item">
          <ve-histogram :data="errors.chartData" :settings="errors.chartSettings"></ve-histogram>
        </div>
      </div>
      <div class="graph-row-col">
        <div class="graph-title">
          <p>浏览器来源分析（今日数据从00:00:00统计）</p>
        </div>
        <div class="graph-item">
          <ve-pie :data="origins.chartData" :settings="origins.chartSettings"></ve-pie>
        </div>
      </div>
    </div>
    <div class="graph-row">
      <div class="graph-row-col-full">
        <div class="graph-title">
          <p>页面响应时间记录（今日数据从00:00:00统计）</p>
        </div>
        <div class="graph-item">
          <ve-line :data="actions.chartData" :settings="actions.chartSettings"></ve-line>
        </div>
      </div>
    </div>

  </main>
  <the-foot/>
</div>
</template>

<script>
import TheFoot from '../../components/TheFoot'
import TheHead from '../../components/TheHead'
export default {
  name: 'home',
  data () {
    return {
      actions: {
        chartData: {
          columns: ['时间', '白屏时间', '用户可操作时间', '总加载时间'],
          rows: []
        },
        chartSettings: {}
      },
      origins: {
        chartData: {
          columns: ['浏览器', '数量'],
          rows: []
        },
        chartSettings: { selectedMode: 'single' }
      },
      errors: {
        chartData: {
          columns: ['时间', '异常数量'],
          rows: []
        },
        chartSettings: {}
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.$_fromsStatic()
      this.$_actionsStatic()
      this.$_errorsStatic()
    })
  },
  methods: {
    $_fromsStatic () {
      this.$http(this.$api.FromsStatic)
        .then(({data}) => {
          for (let i in data) {
            this.origins.chartData.rows.push({
              '浏览器': i, '数量': data[i]
            })
          }
        }).catch(error => {
          console.log(error)
        })
    },
    $_actionsStatic () {
      this.$http(this.$api.ActionsStatic)
        .then(({data}) => {
          data.forEach((item) => {
            this.actions.chartData.rows.push(
              {
                '时间': this.$utils.dateFtt('hh:mm:ss', new Date(item.nowTime)),
                '白屏时间': item.whiteScreenTime,
                '用户可操作时间': item.readyTime,
                '总加载时间': item.allLoadTime }
            )
          })
        }).catch(error => {
          console.log(error)
        })
    },
    $_errorsStatic () {
      this.$http(this.$api.ErrorsStatic)
        .then(({data}) => {
          console.log(data)
          for (let i in data) {
            this.errors.chartData.rows.push(
              { '时间': i, '异常数量': data[i] }
            )
          }
        }).catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    TheFoot,
    TheHead
  }
}
</script>

<style scoped>
main{
  width: 95%;
  margin: 20px auto;
}
.graph-row{
  width: 100%;
  margin-top: 20px;
}
.graph-row-col-full{
  width: calc(94% + 4px);
  height: 400px;
  border: 1px solid #dcdcdc;
  margin-left: 4%;
  background-color: #fff;
}
.graph-row-col{
  width: 45%;
  height: 400px;
  display: inline-block;
  border: 1px solid #dcdcdc;
  margin-left: 4%;
  background-color: #fff;
}
.graph-title{
  width: 100%;
  height:25px;
  background-color: #f6f8f8;
  border-bottom: 1px solid #dcdcdc;
}
.graph-title p{
  color: #333;
  font-weight: 600;
  line-height: 25px;
  text-indent: 1em;
}
.graph-item{
  width: 100%;
  height: 370px;
  overflow: hidden;
  margin-top: 20px;
}
</style>
