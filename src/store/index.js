import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //当前点击商品信息
    toShow:[],
    mycar:[],
    myOrder:[],
    titnum:0,
    myimg:'',
    checkAllflag: false,
    AdressNow:{}
  },
  getters:{
    getmying(state){
      return state.myimg;
    },
    getorder(state){
      return state.myOrder;
    }
  },
  mutations: {
    checkIs(state, who){
      who['flag']=false
      who['zj']=who.price
      who['num']=1
      state.toShow[0]=who
    },
    thisadd(state,who){
      state.mycar.forEach(item=>{
        if(item.name==who.name)
        {
          console.log(item.num)
          item.num++
          console.log(item.num)
        }
      })
    },
    addcar(state){
      state.mycar.push(state.toShow[0])
    },
    deccar(state,who){
      state.mycar=state.mycar.filter(item=>{if(item.id!=who){
        return item
      }})
    },
    Allincar(state,who){
      if(who!=null){
        state.mycar=who
        console.log(state.mycar)
        state.mycar.forEach(item => {
          item['zj'] = item.num*item.price
          item['flag'] = false
          state.titnum+=item["num"]
        });        
      }
    },
    getmyimg(state,imgsrc){
      state.myimg=imgsrc
    },
    checkAll(state){
      state.checkAllflag=!state.checkAllflag
      state.mycar.forEach(item=>{
        item.flag=state.checkAllflag
      })
    },
    caraddnum(state){
      state.titnum++
    },
    cardecnum(state){
      state.titnum--
    },
    tobuy(state){
      state.myOrder.push(state.toShow[0])
    },
    //单点商品详情购买不应该push应该直接替换myOrder
    tobuy2(state){
      state.myOrder=[]
      state.myOrder.push(state.toShow[0])
      console.log(state.myOrder)
    },
    order(state){
      state.myOrder=[]
      // for (item of state.mycar){
      //   if (item.flag==true){
      //     state.myOrder.push(item)
      //   }
      // }
      state.myOrder=state.mycar.filter((item,index)=>{
        if(item.flag==true){
          return item
        }
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
