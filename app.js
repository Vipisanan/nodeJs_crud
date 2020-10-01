const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/AlineDB'
const OktaJwtVerifier = require('@okta/jwt-verifier');

const app =express()
const port = 9000;

mongoose.connect(url , {useNewUrlParser: true})
const con = mongoose.connection

con.on('open' , ()=>{
    console.log("connected....");
})
//tell to node hey im using json for add data
app.use(express.json())
// public route
const aliensRouter = require('./routers/aliens')
app.use('/aliens',aliensRouter)

// protected route
const userRouter = require('./routers/user')
app.use('/user',userRouter);


//----------------------------------------------------------
//jwt
const clientId = "{yourClientId}";
const oktaDomain = "https://localhost:9000";


const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `${oktaDomain}/oauth2/default`,
    clientId: clientId
});
// protected route
app.get('/api/profile', verifyToken, (req, res) => {
    oktaJwtVerifier.verifyAccessToken(req.token)
        .then(jwt => {
            res.send('You are viewing private profile info');
        })
        .catch(err => {
            res.send(err );
        });
});
// public route
app.get('/api/publicInfo', (req, res) => {
    res.status(200).send('You are viewing public info');
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
app.listen(port, () => console.log(`My App listening on port ${port}!`))
