class MyClass2NotIncluded {
  doSomethingResolved() {
    return new Promise((resolve) => {
      return void resolve("error - IS included!");
    });
  }
}

new MyClass2NotIncluded();
