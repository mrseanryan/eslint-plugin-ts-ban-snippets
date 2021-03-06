class MyClass2 {
  doSomethingResolved() {
    return new Promise((resolve) => {
      return void resolve("error!");
    });
  }
}

new MyClass2();
