class MyClass {
  doSomethingResolved() {
    return new Promise((resolve) => {
      return void resolve("error!");
    });
  }
}

new MyClass();
