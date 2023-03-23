<template>
  <div>
    <button @click="keygen">Keygen</button>
    <button @click="encrypt">Encrypt</button>
    <button @click="decrypt">Decrypt</button>
    <button @click="addToItself">Add Operation</button>
  </div>
  <!-- Your template code -->
</template>

<script setup>
import { useKeys } from "~/store/keys/keys.index";
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


</script>
