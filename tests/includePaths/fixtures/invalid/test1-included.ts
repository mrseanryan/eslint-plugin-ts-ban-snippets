class MyClass2Included {
  doSomethingResolved() {
    return new Promise((resolve) => {
      return void resolve("error!");
    });
  }
}

new MyClass2Included();
