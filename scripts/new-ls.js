// scripts/new-ls.js

// ---------------- 模块导入 ---------------- //
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ---------------- 环境变量加载 ---------------- //

/**
 * 加载 .env 文件中的环境变量到 process.env
 */
function loadEnv() {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const envPath = path.resolve(__dirname, "../.env");

	if (fs.existsSync(envPath)) {
		const envConfig = fs.readFileSync(envPath, "utf8");
		envConfig.split("\n").forEach((line) => {
			const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
			if (match) {
				const key = match[1];
				let value = match[2] || "";
				if (value.startsWith('"') && value.endsWith('"')) {
					value = value.slice(1, -1);
				}
				process.env[key] = value;
			}
		});
	}
}

loadEnv();

// 从环境变量中读取百度翻译 API 的配置
const BAIDU_APP_ID = process.env.BAIDU_APP_ID || "";
const BAIDU_SECRET_KEY = process.env.BAIDU_SECRET_KEY || "";

// ---------------- 工具函数 ---------------- //

/**
 * 获取当前日期，格式为 YYYY-MM-DD
 * @returns {string} 当前日期
 */
function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

/**
 * 检查字符串是否包含中文字符
 * @param {string} text - 要检查的字符串
 * @returns {boolean} 是否包含中文字符
 */
function containsChinese(text) {
	return /[\u4e00-\u9fa5]/.test(text);
}

/**
 * 调用百度通用翻译 API，将中文翻译为英文
 * @param {string} text - 要翻译的文本
 * @returns {Promise<string>} 翻译后的英文文本
 */
async function translateToEnglishBaidu(text) {
	if (!containsChinese(text)) {
		console.log(`[跳过翻译] "${text}" 为纯英文或非中文字符。`);
		return text;
	}

	if (!BAIDU_APP_ID || !BAIDU_SECRET_KEY) {
		console.warn(
			"警告: 未检测到 BAIDU_APP_ID 或 BAIDU_SECRET_KEY，降级使用原文本。",
		);
		return text;
	}

	try {
		const salt = Date.now().toString();
		const query = text;

		// 生成鉴权签名
		const signStr = BAIDU_APP_ID + query + salt + BAIDU_SECRET_KEY;
		const sign = crypto.createHash("md5").update(signStr).digest("hex");

		// 构建请求 URL
		const apiUrl = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(query)}&from=zh&to=en&appid=${BAIDU_APP_ID}&salt=${salt}&sign=${sign}`;

		const res = await fetch(apiUrl);
		const data = await res.json();

		if (data.error_code) {
			console.error(
				`百度翻译 API 返回错误: [${data.error_code}] ${data.error_msg}`,
			);
			return text;
		}

		if (data.trans_result && data.trans_result.length > 0) {
			return data.trans_result[0].dst;
		}

		return text;
	} catch (e) {
		console.error("调用百度翻译接口发生异常:", e.message);
		return text;
	}
}

/**
 * 生成规范化的 Slug 路径
 * @param {string} text - 原始文本
 * @returns {string} 规范化的 Slug
 */
function generateSlug(text) {
	return text
		.trim()
		.toLowerCase()
		.replace(/['".,?!]/g, "") // 去除标点符号
		.replace(/[^a-z0-9]+/g, "-") // 替换非字母、数字字符为中划线
		.replace(/(^-|-$)+/g, ""); // 去除头尾多余的中划线
}

// ---------------- 主逻辑 ---------------- //

// 解析命令行参数
const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No filepath argument provided
    Usage: pnpm new-ls <path/to/filename>`);
	process.exit(1);
}

const folderPath = args[0];
const targetDir = "./src/content/posts/";

// 拆分路径以供翻译和文件位置判断
const pathParts = folderPath.split(/[/\\]/);
const isSingleLevel = pathParts.length === 1;

let dirPath;
let fullPath;

if (isSingleLevel) {
	// 单层结构: src/content/posts/hello/index.md
	dirPath = path.resolve(targetDir, folderPath);
	fullPath = path.join(dirPath, "index.md");
} else {
	// 多层结构: src/content/posts/hello/player.md
	const parentDirs = pathParts.slice(0, -1).join(path.sep);
	const fileName = `${pathParts[pathParts.length - 1]}.md`;

	dirPath = path.resolve(targetDir, parentDirs);
	fullPath = path.join(dirPath, fileName);
}

// 提取最后一个名称作为文章的标题
const titleName = pathParts[pathParts.length - 1];

// 检查文件是否已存在
if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists`);
	process.exit(1);
}

// 递归创建多级目录（如果不存在）
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

// 翻译路径以生成英文 Slug
console.log(`Translating path "${folderPath}" via Baidu API...`);
const translatedSlugParts = [];

for (const part of pathParts) {
	const translatedPart = await translateToEnglishBaidu(part);
	translatedSlugParts.push(generateSlug(translatedPart));

	if (containsChinese(part)) {
		await new Promise((resolve) => setTimeout(resolve, 200)); // 延迟防止并发过高
	}
}

const slug = translatedSlugParts.join("/");

// 生成带有 front-matter 的内容
const content = `---
title: ${titleName}
slug: ${slug}
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
console.log(`\nDocument created successfully!
   Path: ${fullPath} 
   Slug: ${slug} 
   Title: ${titleName}`);
