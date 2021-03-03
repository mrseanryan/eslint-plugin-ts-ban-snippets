class MyValidClass {
  doSomethingResolved() {
    return new Promise((resolve) => {
      resolve("error!");
      return;
    });
  }
}

new MyValidClass();
