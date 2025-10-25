// biome-ignore lint/suspicious/noShadowRestrictedNames: <toString from mdast-util-to-string>
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

// 将阅读时间和字数添加到 Astro 前言数据中
// 使用了 mdast-util-to-string 来获取纯文本内容
// 并使用 reading-time 来计算阅读时间和字数
export function remarkReadingTime() {
	return (tree, { data }) => {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);
		data.astro.frontmatter.minutes = Math.max(
			1,
			Math.round(readingTime.minutes),
		);
		data.astro.frontmatter.words = readingTime.words;
	};
}
