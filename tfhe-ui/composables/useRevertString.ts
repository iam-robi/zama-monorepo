
export default function useRevertString(base64String:string) {
  // Decode the Base64 string
  const decodedString = atob(base64String);

  // Convert the decoded string back into an array of numbers
  const arr = [];
  for (let i = 0; i < decodedString.length; i++) {
    arr.push(decodedString.charCodeAt(i));
  }

  return arr;
}