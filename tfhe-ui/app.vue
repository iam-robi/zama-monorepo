<template>
  <div>
    <!-- <button @click="keygen">Keygen</button>
    <button @click="encrypt">Encrypt</button>
    <button @click="decrypt">Decrypt</button>
    <button @click="addToItself">Add Operation</button>
     -->
    
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
      <pre class="encrypted-value"> {{ useEncodeArray(keysStore.cyphertext).base64String }}</pre></div>
  </div>
  </div>
  <!-- Your template code -->
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
.tfhe-app {
  font-family: "Arial", sans-serif;
  background-color: #000;
  color: #fff;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
}

button {
  background-color: #00ff00;
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