import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "AC_DB",
	subtitle: "摆烂ing~",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // 主题颜色的默认色调，从 0 到 360。例如红色：0，青色：200，青色：250，粉色：345
		fixed: false, // 为访客隐藏主题颜色选择器
	},
	banner: {
		enable: true,
		src: "assets/images/ba-banner.png", // 相对于 /src 目录。如果 /public 目录以 '/' 开头，则相对于 /public 目录。
		position: "center", // 等同于 object-position，仅支持 'top'、'center'、'bottom'。默认为 'center'。
		credit: {
			enable: false, // 显示横幅图片的版权文字。
			text: "", // 显示的版权文字。
			url: "", // （可选）原始作品或艺术家页面的 URL 链接。
		},
	},
	toc: {
		enable: true, // 在文章右侧显示目录
		depth: 3, // 表格中显示的最大标题深度，范围为 1 到 3
	},
	favicon: [
		// 将此数组留空即可使用默认的图标
		// {
		// 	src: "/favicon/XXX", // 图标路径，相对于 /public 目录
		// 	theme: "light", // （可选）'light' 或 'dark'，仅当您在亮色和暗色模式下使用不同的图标时才设置
		// 	sizes: "32x32", // （可选）图标大小，仅当您使用不同大小的图标时才设置
		// },
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/AC-DB", // 内部链接不应包含基本路径，因为它会自动添加
			external: true, // 显示外部链接图标，并在新标签页中打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.jpg", // 相对于 /src 目录。如果 /public 目录以 '/' 开头，则相对于 /public 目录。
	name: "AC_DB",
	bio: "写代码、看番、思考人生意义--梦想成为大佬QWQ喵~",
	links: [
		{
			name: "BiliBili",
			icon: "fa6-brands:bilibili", // 访问 https://icones.js.org/ 获取图标代码
			// 如果未包含相应的图标集，则需要安装该图标集的包，
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/620445810",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://steamcommunity.com/id/AC_DB/",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/AC-DB",
		},
	],
};

// 许可证配置
export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（例如背景颜色）将被覆盖，请参阅 astro.config.mjs 文件。
	// 请选择深色主题，因为此博客主题目前仅支持深色背景颜色
	theme: "github-dark",
};
