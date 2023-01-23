const whiteList = [
    "http://www.mysite.com",
    "http://www.localhost:3500",
    "http:127.0.0.1:500"
]

const corsOptions = {
    origin: (origin, callback) =>{
        //check if origin is in the whitelist
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else{
            callback(new Error("Not allowed by cors"));
        }
    },

    optionSuccessStatus: 200

}

module.exports = corsOptions;