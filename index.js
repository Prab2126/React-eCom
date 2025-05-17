// const notherCallme = () => {
//   {
//     console.log(callme());
//   }

//   const value = {
//     msg: callme(),
//   };

//   callme();
//   function callme() {
//     console.log("running in if");
//     return "you called me in object";
//   }
// };

// notherCallme();

{
  callme(); // ❌ ReferenceError
  function callme() {
    console.log("Hi");
  }
}
