test("Test setText", function () {
    this.spy(bundle, "setText");
    setText();
    ok(bundle.setText.calledOnce);
    equals(setText, window.location);
});

// TO BE CONTINUED...