<script lang="ts">
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";
import Giscus from "@giscus/svelte";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getStoredTheme } from "@utils/setting-utils";
import { onMount } from "svelte";

const REPO = "AC-DB/AC-DB.github.io";
const REPO_ID = "R_kgDONwxQcQ";
const CATEGORY = "Blog Comments";
const CATEGORY_ID = "DIC_kwDONwxQcc4C_grI";

function resolveTheme(): string {
	const stored = getStoredTheme();
	if (stored === DARK_MODE) return "noborder_dark";
	if (stored === LIGHT_MODE) return "noborder_light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "noborder_dark"
		: "noborder_light";
}

let theme = $state("noborder_light");

function switchTheme(newTheme: string) {
	theme = newTheme;
	const iframe = document.querySelector<HTMLIFrameElement>(
		"iframe.giscus-frame",
	);
	iframe?.contentWindow?.postMessage(
		{ giscus: { setConfig: { theme: newTheme } } },
		"https://giscus.app",
	);
}

onMount(() => {
	theme = resolveTheme();

	const systemMq = window.matchMedia("(prefers-color-scheme: dark)");
	systemMq.addEventListener("change", () => {
		if (getStoredTheme() === AUTO_MODE) {
			switchTheme(systemMq.matches ? "noborder_dark" : "noborder_light");
		}
	});

	const classObserver = new MutationObserver(() => {
		switchTheme(
			document.documentElement.classList.contains("dark")
				? "noborder_dark"
				: "noborder_light",
		);
	});
	classObserver.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class"],
	});

	return () => classObserver.disconnect();
});
</script>

<div class="giscus-wrapper mt-8">
  <h2 class="text-xl font-bold mb-4 text-black/90 dark:text-white/90">{i18n(I18nKey.comments)}</h2>
  <Giscus
    id="giscus-comments"
    repo={REPO} repoId={REPO_ID} category={CATEGORY} categoryId={CATEGORY_ID}
    mapping="pathname" term="" reactionsEnabled="1" emitMetadata="0" inputPosition="top"
    {theme} lang="zh-CN" loading="lazy"
  />
</div>

<style>
  .giscus-wrapper {
    width: 100%; border-radius: var(--radius-large);
    background: var(--card-bg); padding: 1.5rem;
  }
</style>