// scripts/new-ls.js
import fs from "node:fs";
import path from "node:path";

// 获取当前日期 YYYY-MM-DD
function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

// 命令行参数
const args = process.argv.slice(2);

// 检查是否提供路径参数
if (args.length === 0) {
	console.error(`Error: No filepath argument provided
    Usage: pnpm new-ls <path/to/filename>`);
	process.exit(1);
}

// 将输入的参数作为相对文件夹路径
const folderPath = args[0];

// 定义目标目录
const targetDir = "./src/content/posts/";

// 拼接出完整的文件夹路径和目标 index.md 文件路径
const dirPath = path.resolve(targetDir, folderPath);
const fullPath = path.join(dirPath, "index.md");

// 提取最后一层文件夹的名称作为文章的 Title
const titleName = path.basename(folderPath);

// 检查 index.md 文件是否已存在
if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists `);
	process.exit(1);
}

// 递归创建多级目录（如果不存在）
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

// 组装带有 front-matter 的内容
const content = `---
title: ${titleName}
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
fs.writeFileSync(fullPath, content);

// 输出成功日志
console.log(`Document created successfully at: ${fullPath}`);
