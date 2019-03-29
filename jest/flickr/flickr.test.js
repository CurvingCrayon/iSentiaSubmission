var flickr = require("../../Node/flickr.js");
var input = require("./testData/test1.js");
var output = require("./testData/output1.js");
var fs = require("fs");




test("formats Flickr feed object correctly", async () => {
    var formatted = flickr.formatFeedObject(input.data);
    expect(formatted).toBe(output.data);
});
