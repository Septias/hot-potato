<template>
  <section id="game_anchor" />
</template>

<script setup="props, context" lang="ts">
import { onMounted, ref } from 'vue'
import * as PIXI from 'pixi.js'

export const counter = ref(1)
console.log(context.ref)
const app = new PIXI.Application()

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
})

onMounted(() => {
  document.getElementById('game_anchor').appendChild(app.view)
  app.renderer.view.style.position = 'absolute'
  app.renderer.view.style.display = 'block'
  app.renderer.autoResize = true
  app.renderer.backgroundColor = 0xAAAAAA
  app.renderer.resize(window.innerWidth, window.innerHeight)
})

</script>
