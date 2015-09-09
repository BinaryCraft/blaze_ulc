import helloWorld from './HelloWorld.js';

describe(`When helloWorld is called `, function() {
    it(`it should return "Hello World"`, function() {
        expect(helloWorld()).toEqual("Hello World");
    });
});