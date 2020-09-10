<template lang="html">
  <div class="color-adder-container">
    <div class="color-adder-currency-container">
      <div class="color-adder">
        Green: <span class="color-adder-green">{{format.num(player.color[1].amount)}}</span>
      </div>
    </div>
    <div class="color-progress-container">
      <div class="color-progress-green" :style="{width}"></div>
    </div>
    <button class="color-adder-button" @click="generate()"
           :class="{'button--disabled':             canGenerate !== true,
                    'color-adder-button--disabled': canGenerate !== true,
                    'color-adder-button--auto':     player.color[1].auto == true}">
      <div v-show="canGenerate === false">
        Get 1500 Red
      </div>
      <div v-show="canGenerate !== false">
        Reset previous color
      </div>
      <div v-show="canGenerate !== false">
        <span v-show="canGenerate === true" class="color-adder-text-green">
          + {{format.num(gameData.color[1].gain(player), 1)}} Green
        </span>
        <span v-show="canGenerate === 'generating'" class="color-adder-text--disabled">
          + {{format.num(player.color[1].gainOnReset, 1)}} Green
        </span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props:{
    width: String,
    canGenerate: [Boolean, String]
  },
  methods:{
    generate(){
      this.$emit('generate')
    }
  }
}
</script>

<style lang="css" scoped>
.color-adder-container{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 60px;
}

.color-adder-currency-container{
  display: flex;
  align-items: center;
  padding: 10px;
  width: 150px;
  border: 1px solid var(--border-color);
}

.color-adder-green{
  color: var(--color-green);
  font-size: 20px;
}

.color-progress-container{
  width: 350px;
  border: 1px solid var(--border-color);
}

.color-progress-red, .color-progress-green, .color-progress-blue{
  display: inline-block;
  height: 100%;
}

.color-progress-green{
  background-color: var(--color-green);
}

.color-adder-button{
  padding: 5px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-color: var(--border-color-enabled);
}

.color-adder-button:hover{
  background-color: var(--background-color-enabled--hover);
}

.color-adder-button--disabled, .color-adder-button--auto{
  background-color: var(--background-color-disabled);
  border-color: var(--border-color-disabled);
  cursor: default;
}

.color-adder-button--disabled:hover, .color-adder-button--auto:hover{
  background-color: var(--background-color-disabled);
}

</style>
