<script setup lang="ts">
import CheatSheetLayout from '@/layouts/CheatSheetLayout.vue';
import { ExternalLink } from 'lucide-vue-next';

defineProps<{
    pageTitle: string;
    links: Array<{ text: string; url: string }>;
}>();
</script>

<template>
    <CheatSheetLayout :page-title="pageTitle">
        <div class="space-y-6">
            <div class="prose prose-invert max-w-none">
                <p class="text-neutral-400">
                    Useful external resources for guides, tier lists, and tools.
                </p>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
                <a
                    v-for="(link, i) in links"
                    :key="i"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 p-4 transition-all hover:border-pink-500/50 hover:bg-neutral-800/50"
                >
                    <span
                        class="font-medium text-neutral-200 transition-colors group-hover:text-white"
                    >
                        {{ link.text }}
                    </span>
                    <ExternalLink
                        :size="18"
                        class="ml-4 shrink-0 text-neutral-500 transition-colors group-hover:text-pink-400"
                    />
                </a>
            </div>
        </div>
    </CheatSheetLayout>
</template>
