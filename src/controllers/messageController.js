let hello = function(req, res){

    console.log('hello() in messages controller');
    res.send("Hello there");

}

let privateHello = function(req, res){

    let userName = req.userInfo.fullName;

    console.log("private hello in message controller");
    res.send("Hello there, I can see you are logged in"+userName);
}

module.exports = {
    hello, privateHello
}