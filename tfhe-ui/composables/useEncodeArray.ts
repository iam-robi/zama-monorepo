import { computed } from 'vue';

export default function useEncodeArray(uint8Array:number[]) {

  const base64String = btoa(String.fromCharCode.apply(null, uint8Array));

  return {
    base64String
  };
}