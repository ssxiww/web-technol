function longestCommonPrefix(strs) {
    if (strs.length === 0) return "";
  
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
      while (strs[i].indexOf(prefix) !== 0) {
        prefix = prefix.slice(0, prefix.length - 1);
        if (prefix.length < 2) return "";
      }
    }
    return prefix;
  }
  
  const strs1 = ["цветок", "поток", "хлопок"];
  console.log(longestCommonPrefix(strs1)); 
  
  const strs2 = ["собака", "гоночная машина", "машина"];
  console.log(longestCommonPrefix(strs2)); 