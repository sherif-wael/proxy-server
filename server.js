const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const url = require("url");
const app = express();

app.use(cors());

// idataworkers_server: https://beta.idataworkers.com/
// kpibuilder_server: https://demo.dev.ilpapps.com/

app.use("/cors", createProxyMiddleware({
    changeOrigin: true,
    target: "https://beta.idataworkers.com",
    router: req => {
        const { host, protocol } = url.parse(req.query.url, true);
        return `${protocol}//${host}`;
    },
    pathRewrite: (_, req) => {
        const { path } = url.parse(req.query.url, true);
        return path;
    }
}));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});