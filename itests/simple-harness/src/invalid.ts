class MyInvalidClass {
  doSomethingResolved() {
    return new Promise((resolve) => {
      return void resolve("error!"); // This should raise an error from ts-ban-snippets!
    });
  }
}

new MyInvalidClass();
