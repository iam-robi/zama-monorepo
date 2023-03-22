<template>
  <div>
    <button @click="keygen">Keygen</button>
    <button @click="encrypt">Encrypt</button>
    <button @click="decrypt">Decrypt</button>
  </div>
  <!-- Your template code -->
</template>

<script setup>
import { useKeys } from "~/store/keys/keys.index";
const keysStore = useKeys();
const keygen = async () => {
  let e = await $fetch('/api/keygen?message=2&carry=2').then((res) => {
    console.log(res)
    keysStore.serialized_sks = res.serverkey
    keysStore.serialized_cks = res.clientkey
  })}
  

const encrypt = async () => {
  
  let e = await $fetch('/api/encrypt', { method: 'POST', body: { cks: keysStore.serialized_cks, message: 'blabla' } } ).then((res) => console.log(res))
  console.log(e)
}

const decrypt = async () => {
  let e = await $fetch('/api/decrypt', { method: 'POST', body: { cks: 'v' , cyphertext: 'dfsef'} } ).then((res) => console.log(res))
  console.log(e.api)
}
// onMounted(async () => {
//   await $fetch('/api/keygen').then((res) => console.log(res))
// })

</script>
