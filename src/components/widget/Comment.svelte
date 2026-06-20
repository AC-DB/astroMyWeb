<script lang="ts">
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";
import Giscus from "@giscus/svelte";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getStoredTheme } from "@utils/setting-utils";
import { onMount } from "svelte";

const REPO = "AC-DB/AC-DB.github.io"; // 仓库全名
const REPO_ID = "R_kgDONwxQcQ"; // 仓库 ID
const CATEGORY = "Blog Comments"; // 分类名称
const CATEGORY_ID = "DIC_kwDONwxQcc4C_grI"; // 分类 ID

const LIGHT_THEME =
	"https://cdn.jsdelivr.net/gh/AC-DB/AC-DB.github.io@main/public/giscus-light.css";
const DARK_THEME =
	"https://cdn.jsdelivr.net/gh/AC-DB/AC-DB.github.io@main/public/giscus-dark.css";

/**
 * 根据 Fuwari 存储的主题 + 系统偏好解析实际使用的主题
 * 返回 "light" 或 "dark"
 */
function resolveEffectiveTheme(): "light" | "dark" {
	const stored = getStoredTheme();
	if (stored === DARK_MODE) return "dark";
	if (stored === LIGHT_MODE) return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

let effectiveTheme = $state<"light" | "dark">("light");
let giscusReady = $state(false);

function sendGiscusTheme(theme: "light" | "dark") {
	const iframe = document.querySelector<HTMLIFrameElement>(
		"iframe.giscus-frame",
	);
	if (!iframe?.contentWindow) return;
	iframe.contentWindow.postMessage(
		{
			giscus: {
				setConfig: {
					theme: theme === "dark" ? DARK_THEME : LIGHT_THEME,
				},
			},
		},
		"https://giscus.app",
	);
}

onMount(() => {
	effectiveTheme = resolveEffectiveTheme();
	giscusReady = true;

	const systemMq = window.matchMedia("(prefers-color-scheme: dark)");
	const systemListener = () => {
		if (getStoredTheme() === AUTO_MODE) {
			const newTheme = systemMq.matches ? "dark" : "light";
			if (newTheme !== effectiveTheme) {
				effectiveTheme = newTheme;
				sendGiscusTheme(newTheme);
			}
		}
	};
	systemMq.addEventListener("change", systemListener);

	const classObserver = new MutationObserver(() => {
		const isDark = document.documentElement.classList.contains("dark");
		const newTheme = isDark ? "dark" : "light";
		if (newTheme !== effectiveTheme) {
			effectiveTheme = newTheme;
			sendGiscusTheme(newTheme);
		}
	});
	classObserver.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class"],
	});

	return () => {
		systemMq.removeEventListener("change", systemListener);
		classObserver.disconnect();
	};
});
</script>

<div class="giscus-wrapper mt-8">
  <h2 class="text-xl font-bold mb-4 text-black/90 dark:text-white/90">
    {i18n(I18nKey.comments)}
  </h2>
    {#if giscusReady}
    <Giscus
      id="giscus-comments"
      repo={REPO}
      repoId={REPO_ID}
      category={CATEGORY}
      categoryId={CATEGORY_ID}
      mapping="pathname"
      term=""
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={effectiveTheme === "dark" ? DARK_THEME : LIGHT_THEME}
      lang="zh-CN"
      loading="lazy"
    />
    {/if}
</div>

<style>
  .giscus-wrapper {
    width: 100%;
    border-radius: var(--radius-large);
    background: var(--card-bg);
    padding: 1.5rem;
  }
</style>