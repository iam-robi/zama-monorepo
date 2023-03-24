<template>
  <div class="wrapper">
    <div class="magicpattern">

    <div class="tfhe-app">
    <button @click="keygen" class="generate-key-btn">Generate Key</button>
    <div class="key-container">
      <div class="key-box blurred">{{ keysStore.serialized_cks }}</div>
      <button class="download-btn">Download</button>
    </div>
    <div class="encryption-container">
      <input type="number" v-model="keysStore.message" class="number-input" />
      <button @click="encrypt" class="encrypt-btn">Encrypt</button>
    </div>
    <div >Encrypted value:
      <div class="pre-container">
      <pre id="preElement" class="encrypted-value"> {{ useEncodeArray(keysStore.cyphertext).base64String }}</pre></div>
      <!-- <button class="copy-btn" onclick="copyToClipboard()">Copy to Clipboard</button> -->
      </div>
    </div>

    </div>
  </div>

</template>

<script setup>
import { useKeys } from "~/store/keys/keys.index";
import useEncodeArray from "~/composables/useEncodeArray";

// const { encodeArray } = useEncodeArray();
console.log("encode array", useEncodeArray([8,9]));

const keysStore = useKeys();
//Operated by client
const keygen = async () => {
  await $fetch('/api/keygen?message=2&carry=2').then((res) => {
    console.log(res)
    // keysStore.serialized_sks = res.serverkey
    keysStore.serialized_cks = res.clientkey
  })}
  
//Operated by client
const encrypt = async () => {
  await $fetch('/api/encrypt', { method: 'POST', body: { cks: keysStore.serialized_cks, message: 3 } } ).then((res) => 
  {
    console.log(res)
    keysStore.cyphertext = res.cyphertext
  }
  )
}
//Operated by server
const addToItself = async () => {
  await $fetch('/api/operation/add', { method: 'POST', body: { cks: keysStore.serialized_cks , cyphertext: keysStore.cyphertext} } ).then((res) => 
  { 
    console.log(res)
    keysStore.result_ct = res.cyphertext
  }
  )
}
//Operated by client
const decrypt = async () => {
  await $fetch('/api/decrypt', { method: 'POST', body: { cks: keysStore.serialized_cks , cyphertext: keysStore.result_ct} } ).then((res) => {
    console.log(res)
    keysStore.result = res.result
  })
}

onMounted(async () => {
  console.log("mounted")
  $fetch('http://localhost:8000').then((res) => {
    console.log(res)
  })
});

</script>
<style scoped>
.pre-container {
   position: relative;
}
.copy-btn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1F1F2A;
  background-image: url("data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 1500 1100%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cmask id=%22b%22 x=%220%22 y=%220%22 width=%221500%22 height=%221100%22%3E%3Cpath fill=%22url(%23a)%22 d=%22M0 0h1500v1100H0z%22%2F%3E%3C%2Fmask%3E%3Cpath fill=%22%23000336%22 d=%22M0 0h1500v1100H0z%22%2F%3E%3Cg style=%22transform-origin:center center%22 stroke=%22%234c4e72%22 stroke-width=%221.5%22 mask=%22url(%23b)%22%3E%3Cpath fill=%22none%22 d=%22M0 0h75v75H0zM75 0h75v75H75z%22%2F%3E%3Cpath fill=%22%234c4e723a%22 d=%22M150 0h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M225 0h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72a0%22 d=%22M300 0h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72ef%22 d=%22M375 0h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M450 0h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e724d%22 d=%22M525 0h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M600 0h75v75h-75zM675 0h75v75h-75zM750 0h75v75h-75zM825 0h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7209%22 d=%22M900 0h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M975 0h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7220%22 d=%22M1050 0h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1125 0h75v75h-75zM1200 0h75v75h-75zM1275 0h75v75h-75zM1350 0h75v75h-75zM1425 0h75v75h-75zM0 75h75v75H0zM75 75h75v75H75z%22%2F%3E%3Cpath fill=%22%234c4e7298%22 d=%22M150 75h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M225 75h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72fe%22 d=%22M300 75h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M375 75h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7216%22 d=%22M450 75h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72ac%22 d=%22M525 75h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M600 75h75v75h-75zM675 75h75v75h-75zM750 75h75v75h-75zM825 75h75v75h-75zM900 75h75v75h-75zM975 75h75v75h-75zM1050 75h75v75h-75zM1125 75h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72aa%22 d=%22M1200 75h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1275 75h75v75h-75zM1350 75h75v75h-75zM1425 75h75v75h-75zM0 150h75v75H0zM75 150h75v75H75zM150 150h75v75h-75zM225 150h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e720c%22 d=%22M300 150h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M375 150h75v75h-75zM450 150h75v75h-75zM525 150h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72f7%22 d=%22M600 150h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M675 150h75v75h-75zM750 150h75v75h-75zM825 150h75v75h-75zM900 150h75v75h-75zM975 150h75v75h-75zM1050 150h75v75h-75zM1125 150h75v75h-75zM1200 150h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7209%22 d=%22M1275 150h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1350 150h75v75h-75zM1425 150h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72cc%22 d=%22M0 225h75v75H0z%22%2F%3E%3Cpath fill=%22none%22 d=%22M75 225h75v75H75z%22%2F%3E%3Cpath fill=%22%234c4e7220%22 d=%22M150 225h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M225 225h75v75h-75zM300 225h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72ba%22 d=%22M375 225h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M450 225h75v75h-75zM525 225h75v75h-75zM600 225h75v75h-75zM675 225h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7291%22 d=%22M750 225h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M825 225h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7257%22 d=%22M900 225h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M975 225h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7232%22 d=%22M1050 225h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7250%22 d=%22M1125 225h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1200 225h75v75h-75zM1275 225h75v75h-75zM1350 225h75v75h-75zM1425 225h75v75h-75zM0 300h75v75H0z%22%2F%3E%3Cpath fill=%22%234c4e72dc%22 d=%22M75 300h75v75H75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M150 300h75v75h-75zM225 300h75v75h-75zM300 300h75v75h-75zM375 300h75v75h-75zM450 300h75v75h-75zM525 300h75v75h-75zM600 300h75v75h-75zM675 300h75v75h-75zM750 300h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e729b%22 d=%22M825 300h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M900 300h75v75h-75zM975 300h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72d0%22 d=%22M1050 300h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1125 300h75v75h-75zM1200 300h75v75h-75zM1275 300h75v75h-75zM1350 300h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7281%22 d=%22M1425 300h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e722b%22 d=%22M0 375h75v75H0z%22%2F%3E%3Cpath fill=%22none%22 d=%22M75 375h75v75H75z%22%2F%3E%3Cpath fill=%22%234c4e721c%22 d=%22M150 375h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7259%22 d=%22M225 375h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7252%22 d=%22M300 375h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7242%22 d=%22M375 375h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M450 375h75v75h-75zM525 375h75v75h-75zM600 375h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72fc%22 d=%22M675 375h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M750 375h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72f8%22 d=%22M825 375h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72c1%22 d=%22M900 375h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M975 375h75v75h-75zM1050 375h75v75h-75zM1125 375h75v75h-75zM1200 375h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e723b%22 d=%22M1275 375h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1350 375h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72f2%22 d=%22M1425 375h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M0 450h75v75H0zM75 450h75v75H75zM150 450h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72a4%22 d=%22M225 450h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M300 450h75v75h-75zM375 450h75v75h-75zM450 450h75v75h-75zM525 450h75v75h-75zM600 450h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7285%22 d=%22M675 450h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M750 450h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7226%22 d=%22M825 450h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M900 450h75v75h-75zM975 450h75v75h-75zM1050 450h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7275%22 d=%22M1125 450h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1200 450h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7206%22 d=%22M1275 450h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1350 450h75v75h-75zM1425 450h75v75h-75zM0 525h75v75H0zM75 525h75v75H75zM150 525h75v75h-75zM225 525h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7218%22 d=%22M300 525h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M375 525h75v75h-75zM450 525h75v75h-75zM525 525h75v75h-75zM600 525h75v75h-75zM675 525h75v75h-75zM750 525h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7231%22 d=%22M825 525h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7223%22 d=%22M900 525h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e720a%22 d=%22M975 525h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1050 525h75v75h-75zM1125 525h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7297%22 d=%22M1200 525h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1275 525h75v75h-75zM1350 525h75v75h-75zM1425 525h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72ac%22 d=%22M0 600h75v75H0z%22%2F%3E%3Cpath fill=%22none%22 d=%22M75 600h75v75H75zM150 600h75v75h-75zM225 600h75v75h-75zM300 600h75v75h-75zM375 600h75v75h-75zM450 600h75v75h-75zM525 600h75v75h-75zM600 600h75v75h-75zM675 600h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7294%22 d=%22M750 600h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M825 600h75v75h-75zM900 600h75v75h-75zM975 600h75v75h-75zM1050 600h75v75h-75zM1125 600h75v75h-75zM1200 600h75v75h-75zM1275 600h75v75h-75zM1350 600h75v75h-75zM1425 600h75v75h-75zM0 675h75v75H0zM75 675h75v75H75z%22%2F%3E%3Cpath fill=%22%234c4e722b%22 d=%22M150 675h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72d6%22 d=%22M225 675h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7296%22 d=%22M300 675h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72de%22 d=%22M375 675h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M450 675h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72f0%22 d=%22M525 675h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7297%22 d=%22M600 675h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7226%22 d=%22M675 675h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e724d%22 d=%22M750 675h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M825 675h75v75h-75zM900 675h75v75h-75zM975 675h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7279%22 d=%22M1050 675h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1125 675h75v75h-75zM1200 675h75v75h-75zM1275 675h75v75h-75zM1350 675h75v75h-75zM1425 675h75v75h-75zM0 750h75v75H0z%22%2F%3E%3Cpath fill=%22%234c4e72e9%22 d=%22M75 750h75v75H75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M150 750h75v75h-75zM225 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72a8%22 d=%22M300 750h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M375 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e727b%22 d=%22M450 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72e4%22 d=%22M525 750h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M600 750h75v75h-75zM675 750h75v75h-75zM750 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e722a%22 d=%22M825 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7252%22 d=%22M900 750h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M975 750h75v75h-75zM1050 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72f3%22 d=%22M1125 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7246%22 d=%22M1200 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7226%22 d=%22M1275 750h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1350 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e722b%22 d=%22M1425 750h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72f1%22 d=%22M0 825h75v75H0z%22%2F%3E%3Cpath fill=%22none%22 d=%22M75 825h75v75H75zM150 825h75v75h-75zM225 825h75v75h-75zM300 825h75v75h-75zM375 825h75v75h-75zM450 825h75v75h-75zM525 825h75v75h-75zM600 825h75v75h-75zM675 825h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e720e%22 d=%22M750 825h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M825 825h75v75h-75zM900 825h75v75h-75zM975 825h75v75h-75zM1050 825h75v75h-75zM1125 825h75v75h-75zM1200 825h75v75h-75zM1275 825h75v75h-75zM1350 825h75v75h-75zM1425 825h75v75h-75zM0 900h75v75H0zM75 900h75v75H75z%22%2F%3E%3Cpath fill=%22%234c4e729c%22 d=%22M150 900h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M225 900h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72d1%22 d=%22M300 900h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7247%22 d=%22M375 900h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M450 900h75v75h-75zM525 900h75v75h-75zM600 900h75v75h-75zM675 900h75v75h-75zM750 900h75v75h-75zM825 900h75v75h-75zM900 900h75v75h-75zM975 900h75v75h-75zM1050 900h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72b6%22 d=%22M1125 900h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1200 900h75v75h-75zM1275 900h75v75h-75zM1350 900h75v75h-75zM1425 900h75v75h-75zM0 975h75v75H0zM75 975h75v75H75zM150 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e724a%22 d=%22M225 975h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M300 975h75v75h-75zM375 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72fb%22 d=%22M450 975h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M525 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e722e%22 d=%22M600 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7256%22 d=%22M675 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72e7%22 d=%22M750 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72c2%22 d=%22M825 975h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M900 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72be%22 d=%22M975 975h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M1050 975h75v75h-75zM1125 975h75v75h-75zM1200 975h75v75h-75zM1275 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e725b%22 d=%22M1350 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e721f%22 d=%22M1425 975h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e726e%22 d=%22M0 1050h75v75H0z%22%2F%3E%3Cpath fill=%22%234c4e7238%22 d=%22M75 1050h75v75H75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M150 1050h75v75h-75zM225 1050h75v75h-75zM300 1050h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e72e7%22 d=%22M375 1050h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7236%22 d=%22M450 1050h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M525 1050h75v75h-75zM600 1050h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7260%22 d=%22M675 1050h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e727f%22 d=%22M750 1050h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M825 1050h75v75h-75z%22%2F%3E%3Cpath fill=%22%234c4e7241%22 d=%22M900 1050h75v75h-75z%22%2F%3E%3Cpath fill=%22none%22 d=%22M975 1050h75v75h-75zM1050 1050h75v75h-75zM1125 1050h75v75h-75zM1200 1050h75v75h-75zM1275 1050h75v75h-75zM1350 1050h75v75h-75zM1425 1050h75v75h-75z%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CradialGradient id=%22a%22%3E%3Cstop offset=%220%22 stop-color=%22%23fff%22%2F%3E%3Cstop offset=%221%22 stop-color=%22%23fff%22 stop-opacity=%220%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");

}
.tfhe-app {
  font-family: "Arial", sans-serif;
  background-color: rgba(31, 31, 42, 0.8);
  color: #fff;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}


button {
  background-color: #93BFA4;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
}

input {
  background-color: #333;
  border: none;
  color: #fff;
  padding: 10px;
  font-size: 14px;
}

.key-container,
.encryption-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.key-box {
  flex: 1;
  height: 40px;
  background-color: #333;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.blurred::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.encrypted-value {
  margin-top: 20px;
}

.encrypted-value {
  max-height: 100px;
  overflow-y: auto;
  margin-top: 20px;
  background-color: #f0f0f0;
  color: #333;
  padding: 1rem;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  white-space: pre-wrap;
  overflow-wrap: break-word; /* Add this line */
}


</style>