// Diccionario de codificación predefinido
const codeMap = {
    1: "9WL",
    2: "E8M",
    3: "72N",
    4: "UI6",
    5: "O5B",
    6: "4SV",
    7: "D3C",
    8: "2HX",
    9: "J1Z",
    0: "A0S"
  };
  
  // Función para codificar el número
  export const encodeId = (id) => {
    // Convertir el número en un array de dígitos
    const digits = id.toString().split('').map(Number);
  
    // Concatenar las cadenas correspondientes a cada dígito
    return digits.map(digit => codeMap[digit]).join('');
  };
  
  // Función para decodificar el código
  export const decodeId = (encodedId) => {
    let decodedId = '';
    
    // Descomponer el código en bloques de 3 caracteres
    for (let i = 0; i < encodedId.length; i += 3) {
      const block = encodedId.slice(i, i + 3);
      
      // Encontrar el número correspondiente a cada bloque
      const digit = Object.keys(codeMap).find(key => codeMap[key] === block);
      if (digit) {
        decodedId += digit;
      } else {
        throw new Error("Código no válido");
      }
    }
  
    return parseInt(decodedId, 10); // Convertir a número y devolver
  };
  
  // Ejemplo de uso
  const encoded1 = encodeId(1);    // "QWL"
  const encoded12 = encodeId(12);  // "QWLERM"
  const encoded123 = encodeId(123); // "QWLERMTYN"
  
  console.log("Codificado (1):", encoded1);    // Resultado: "QWL"
  console.log("Codificado (12):", encoded12);  // Resultado: "QWLERM"
  console.log("Codificado (123):", encoded123); // Resultado: "QWLERMTYN"
  
  const decoded1 = decodeId(encoded1);
  const decoded12 = decodeId(encoded12);
  const decoded123 = decodeId(encoded123);
  
  console.log("Decodificado:", decoded1);    // Resultado: 1
  console.log("Decodificado:", decoded12);   // Resultado: 12
  console.log("Decodificado:", decoded123);  // Resultado: 123  