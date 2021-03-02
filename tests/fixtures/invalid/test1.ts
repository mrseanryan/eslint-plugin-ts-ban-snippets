class MyClass {
  doSomethingResolved() {
    return new Promise((resolve, reject) => {
      return void resolve("error!");
    });
  }
}
