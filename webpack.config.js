const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const htmlPluginConfig = new HtmlWebPackPlugin({
	template: './src/index.html',
})

const prod = process.env.NODE_ENV === 'production'

module.exports = {
	output: {
		filename: '[name].[contenthash].js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.css$/,
				use: [prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
			},
			{
				test: /\.less$/,
				use: [
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true,
							localIdentName: '[local]___[hash:base64:5]',
						},
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
						},
					},
				],
			},
			{
				test: /\.(jpg|png|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: { name: 'img/[hash]-[name].[ext]' },
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [htmlPluginConfig, new MiniCssExtractPlugin({ filename: '[name].css' })],
}
