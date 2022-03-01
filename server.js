const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/cors", createProxyMiddleware({
    changeOrigin: true,
    target: "https://api.ilpapps.com",
    router: req => {
        return req.query.url;
    },
    pathRewrite: {
        [`^/cors`]: "",
    }
}));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});