class MyClassM1 {
  doSomethingResolved() {
    return new Promise((resolve) => {
      return void resolve("error!");
    });
  }
}

new MyClassM1();
