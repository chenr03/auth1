

let hello = function(req, res){
    console.log('hello() in messages controller');
    res.send("Hello there");

}

let privateHello = function(req, res){
    console.log("private hello in message controller");
    res.send("Hello there, I can see you are logged in");
}

module.exports = {
    hello, privateHello
}