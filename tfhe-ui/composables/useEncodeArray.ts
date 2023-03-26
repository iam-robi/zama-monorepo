import { computed } from 'vue';
import { ref } from 'vue';

export default function useEncodeArray(uint8Array:number[]) {
  
  const computingb64 = ref(false);
  // const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
  
  async function uint8ArrayToBase64Simple(uint8Array:number[]): Promise<string> {
    // The uint8ArrayToBase64 implementation goes here.
    console.time("Execution time")
    const base64String = await btoa(String.fromCharCode.apply(null, uint8Array));
    console.timeEnd("Execution time")
    return base64String;
  }

  function uint8ArrayToBase64Direct(uint8Array:number[]): string {
    console.time("Execution time");

    const CHUNK_SIZE = 8192; // You can adjust this value based on your environment.
    let base64String = "";
  
    for (let i = 0; i < uint8Array.length; i += CHUNK_SIZE) {
      const slice = uint8Array.slice(i, i + CHUNK_SIZE);
      base64String += btoa(String.fromCharCode.apply(null, slice));
    }
  
    console.timeEnd("Execution time");
    console.log("base64String", base64String)
    if(!base64String) {console.log("base64String is empty")}
    return base64String;
  }

  async function uint8ArrayToBase64(uint8Array: Uint8Array): Promise<string> {
    console.time("Execution time2")
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
  
    // Custom function to create a ReadableStream from a Uint8Array
    function createReadableStream(array: Uint8Array): ReadableStream<Uint8Array> {
      return new ReadableStream<Uint8Array>({
        async start(controller) {
          controller.enqueue(array);
          controller.close();
        },
      });
    }
    console.log("readable stream created")
    const reader = createReadableStream(uint8Array).getReader();
    const transformer = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>) {
        const encodedChunk = btoa(decoder.decode(chunk, { stream: true }));
        controller.enqueue(encoder.encode(encodedChunk));
      },
    });
    console.log("transformer created")
  
    const stream = new ReadableStream<Uint8Array>({
      async start(controller: ReadableStreamDefaultController<Uint8Array>) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          await transformer.writable.getWriter().write(value);
          const { value: transformedValue } = await transformer.readable.getReader().read();
          controller.enqueue(transformedValue);
        }
        controller.close();
      },
    });
    console.log("stream created")
  
    const chunks: Uint8Array[] = [];
    const base64StreamReader = stream.getReader();
    while (true) {
      const { done, value } = await base64StreamReader.read();
      if (done) {
        break;
      }
      console.log(value)
      chunks.push(value);
    }
    const blob = new Blob(chunks);
    const arrayBuffer = await blob.arrayBuffer();
    console.log("arrayBuffer created")
    console.timeEnd("Execution time2")
    return decoder.decode(arrayBuffer);
  }
  
  return {
    computingb64,
    uint8ArrayToBase64,
    uint8ArrayToBase64Simple,
    uint8ArrayToBase64Direct
  };
}