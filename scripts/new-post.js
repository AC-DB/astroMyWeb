/* 这是一个创建带有 front-matter 的新 post markdown 文件的脚本 */

import fs from "node:fs";
import path from "node:path";

// 获取当前日期的函数，格式为 YYYY-MM-DD
function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

// 获取命令行参数
const args = process.argv.slice(2);

// 检查是否提供了文件名参数
if (args.length === 0) {
	console.error(`Error: No filename argument provided
    Usage: npm run new-post -- <filename>`);
	process.exit(1); // 终止脚本并返回错误代码 1
}

let fileName = args[0];

// 如果不存在，请添加 .md 扩展名
const fileExtensionRegex = /\.(md|mdx)$/i;
if (!fileExtensionRegex.test(fileName)) {
	fileName += ".md";
}

// 定义目标目录和完整文件路径
const targetDir = "./src/content/posts/";
const fullPath = path.join(targetDir, fileName);

// 检查文件是否已存在
if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists `);
	process.exit(1);
}

// 递归模式创建多级目录
const dirPath = path.dirname(fullPath);
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

// 创建带有 front-matter 的新 markdown 文件
const content = `---
title: ${args[0]}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: true 
lang: ''
---
`;

// 写入文件
fs.writeFileSync(path.join(targetDir, fileName), content);

// 输出成功创建的消息
console.log(`Post ${fullPath} created`);
