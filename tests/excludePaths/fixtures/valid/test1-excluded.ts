class MyClass2Excluded {
  doSomethingResolved() {
    return new Promise((resolve) => {
      return void resolve("error!");
    });
  }
}

new MyClass2Excluded();
