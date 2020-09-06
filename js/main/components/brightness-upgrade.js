Vue.component("brightness-upgrade", {
  props:{
    nodes: Array
  },
  data(){
    return{
      selected: ""
    }
  },
  methods:{
    toggleNode(id){
      if (this.selected == id){
        this.selected = ""
        return
      }
      this.selected = id
    },
    popupPos(sel){
      if (sel == '') return ["0", "0"]
      for (node of this.nodes){
        if (node.id == sel){
          let x = node.pos[0]
          let y = node.pos[1]
          return [x, y]
        }
      }
      return ["0", "0"]
    }
  },
  mounted(){

  },
  template: `
  <div style="position: relative; width: 600px;">
    <div v-show="selected != ''" class="brightness-upgrade-popup"
                                 style="position: absolute; z-index: 2;"
                                :style="{'left': popupPos(selected)[0], 'top': popupPos(selected)[1]}">
      <div>
      I eat ass
      </div>
    </div>
    <button v-for="node in nodes" class="brightness-upgrade-button"
                                  style="position: absolute; z-index: 1;" :key=node.id
                                 :style="{'left': node.pos[0], 'top': node.pos[1]}"
                                 @click="toggleNode(node.id)">
      <div>{{node.name}}</div>
    </button>
    <canvas id="brightness-upgrade-canvas">
    </canvas>
  </div>
  `
})
