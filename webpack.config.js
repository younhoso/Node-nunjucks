
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    name: 'Node-webpack-nunjucks',
    mode: 'development', //실서버스로 반영할때: production으로 변경
    devtool: 'eval',     // eval은 빌드하는 속도를 빠르게 해준다. 배포할때는 'hidden-source-map' 변경
    resolve: {     //entry에 확장자들 지정
        extensions: ['.js', '.html']
    },
    entry: { //입력
        app:['./app'],
    },
    module: {
        rules: [ 
            {  //babel loader
                test: /\.(js|jsx)$/,    
                include: path.join(__dirname,'dist'),
                exclude: /(node_modules)|(dist)/,   
                loader: 'babel-loader'
            },
            { // images css에서 background-image 속성 loader
                test: /\.(png|svg|jpe?g|gif)$/,
                loader:'url-loader',
                options: {
                  outputPath: 'images/',
                  limit: 10000
                }
            },
            { // font loader
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
            },
            {  // scss 또는 css loader
                test: /\.css$/,                   
                exclude: /node_modules/,           
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',              
                    use: ['css-loader', 'sass-loader']   
                })
            },
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new ExtractTextPlugin('styles.css'),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // favicon: './static/asset/favicon.ico',
            template: 'html/index.html',
              chunks: ['css', 'index', 'app', 'system', 'monitor']
        })
    ],
    output: {  //출력
        filename: 'app.js',
        publicPath: '/dist/',   //추가
        path: path.join(__dirname, 'dist') 
    }
};