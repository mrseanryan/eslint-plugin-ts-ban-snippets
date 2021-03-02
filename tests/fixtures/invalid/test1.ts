/* eslint-disable @typescript-eslint/no-unused-vars */
class MyClass {
  doSomethingResolved() {
    return new Promise((resolve, _reject) => {
      return void resolve("error!");
    });
  }
}
