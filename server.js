const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const app = express();

const regex = /\/cors\?url=.*\?/;

app.use(cors());

// It requires a little bit of modification as the target url is derived from ?url=*
// So query params cant be read the only query param that will reach the server will be <url>
// We need to derive the target url through req.query.url.replace(/\?.*/, "")
// and remove /cors?url=target.com from the path

app.use("/cors", createProxyMiddleware({
    changeOrigin: true,
    target: "https://beta.idataworkers.com",
    router: req => {
        return req.query.url.replace(/\?.*/, "");
    },
    pathRewrite: (path, req) => {
        return path.replace(regex, "?");
    }
}));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});