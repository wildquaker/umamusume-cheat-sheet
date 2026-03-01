<script setup lang="ts">
import CheatSheetLayout from '@/layouts/CheatSheetLayout.vue';
import { Calendar } from 'lucide-vue-next';

type Race = {
    name: string;
    time: string;
    note?: string;
    optional?: boolean;
};

type YearGroup = {
    year: string;
    races: Race[];
};

defineProps<{
    pageTitle: string;
    races: YearGroup[];
}>();
</script>

<template>
    <CheatSheetLayout :page-title="pageTitle">
        <div class="space-y-8">
            <div class="prose prose-invert max-w-none">
                <p class="text-neutral-400">
                    Key races to target for the "URA Finale" scenario.
                </p>
            </div>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="yearGroup in races"
                    :key="yearGroup.year"
                    class="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
                >
                    <div
                        class="flex items-center gap-3 border-b border-neutral-800 bg-neutral-800/50 p-4"
                    >
                        <Calendar :size="20" class="text-pink-400" />
                        <h3 class="text-lg font-semibold text-white">
                            {{ yearGroup.year }}
                        </h3>
                    </div>
                    <div class="space-y-3 p-4">
                        <div
                            v-for="race in yearGroup.races"
                            :key="race.name"
                            class="group -mx-2 flex items-start justify-between rounded-lg p-2 transition-colors hover:bg-neutral-800/50"
                        >
                            <div class="space-y-0.5">
                                <span
                                    class="block font-medium text-neutral-200 transition-colors group-hover:text-pink-300"
                                >
                                    {{ race.name }}
                                </span>
                                <span
                                    v-if="race.note"
                                    class="block text-xs text-neutral-500"
                                >
                                    {{ race.note }}
                                </span>
                            </div>
                            <span
                                class="rounded bg-neutral-950 px-2 py-1 font-mono text-sm whitespace-nowrap text-neutral-500"
                            >
                                {{ race.time }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CheatSheetLayout>
</template>
