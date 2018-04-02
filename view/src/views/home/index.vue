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
          <template v-if="!isErrorDetail">
            <ve-histogram :data="errors.chartData" :settings="errors.chartSettings" :events="getErrorDeatil"></ve-histogram>
          </template>
         <template v-else>
           <div class="error-detail-container">
             <!--返回按钮-->
             <div class="error-detail-return">
               <img src="static/img/exit.png" @click="isErrorDetail=false"/>
             </div>
             <!--主体内容-->
             <div class="error-content">
               <div class="error-item" v-for="(item,index) in errorList" :key="index">
                 <div class="error-item-title"><p>错误地址：{{item.url}}<span>时间：{{$utils.dateFtt('hh:mm:ss', new Date(item.nowTime))}}</span></p></div>
                 <div class="error-item-msg"><p>行/列：{{item.line}}/{{item.col}} </p><p>详情：{{item.msg}}</p></div>
               </div>
             </div>
           </div>
         </template>
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
     <!--百度地图-->
    <div class="graph-row graph-map">
      <div class="graph-row-col-full">
        <div class="graph-title">
          <p>访客城市位置分析（今日数据从00:00:00统计）</p>
        </div>
        <div class="graph-item">
          <ve-map :data="map.chartData" :settings="map.chartSettings" height="450px"></ve-map>
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
      isErrorDetail: false,
      errorList: [],
      map: {
        chartData: {
          columns: ['位置', '访客数量'],
          rows: []
        },
        chartSettings: {
          roam: true,
          zoom: 1.2
        }
      },
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
      this.$_getPlacesStatic()
    })
    this.getErrorDeatil = {
      click: (e) => {
        this.$_getErrorDetail(e.name)
      }
    }
  },
  methods: {
    // 浏览器版本分析
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
    // 访问数据
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
    // 错误数据
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
    },
    // 根据时间段获取错误信息
    $_getErrorDetail (name) {
      this.isErrorDetail = true
      this.$http(this.$api.GetDetailError, {time: name})
        .then(({data}) => {
          this.errorList = data
          console.log(data)
        }).catch(error => {
          console.log(error)
        })
    },
    // 获取位置数据
    $_getPlacesStatic () {
      this.$http(this.$api.PlacesStatic)
        .then(({data}) => {
          for (let i in data) {
            this.map.chartData.rows.push({ '位置': i, '访客数量': data[i] })
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
/*以下是错误详情内容*/
.error-detail-container{
  width: 96%;
  margin: 0px auto;
}
.error-detail-return{
  width: 100%;
  height: 30px;
  position: relative;
}
.error-detail-return img{
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  right: 0px;
}
.error-content{
  width: 100%;
  height: 310px;
  overflow-y: auto;
  padding: 8px;
}
.error-item{
  width: 100%;
  margin: 10px auto;
  padding: 5px;
  border-bottom: 1px dotted gray;
}
.error-item-title{
  width: 100%;
  height: 20px;
  font-size: 14px;
}
.error-item-title span{
  margin-left: 5px;
}
.error-item-msg{
  color: gray;
  font-size: 13px;
}
.graph-map,.graph-map >div,.graph-map .graph-item{
  height: 500px;
}
</style>
