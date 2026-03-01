<script setup lang="ts">
import CheatSheetLayout from '@/layouts/CheatSheetLayout.vue';
import { Trophy, Info, TrendingUp } from 'lucide-vue-next';

type TargetStats = {
    Speed?: number | string;
    Stamina?: number | string;
    Power?: number | string;
    Guts?: number | string;
    Wit?: number | string;
    Misc?: string;
};

type Build = {
    Cards: string[];
    Inherit: string;
    'Target Stats': TargetStats;
    Note: string;
};

type DistanceGroup = {
    Distance: string;
    build: Build[];
};

type Scenario = {
    Scenario: string;
    builds: DistanceGroup[];
};

defineProps<{
    pageTitle: string;
    builds: Scenario[];
}>();

const cardImages: Record<string, string> = {
    Speed: 'images/speed.png',
    Stamina: 'images/stamina.png',
    Power: 'images/power.png',
    Wit: 'images/wit.png',
    'Speed/Power': 'images/speed_power.png',
    'Speed/Stamina': 'images/speed_stamina.png',
    'Speed/Pal': 'images/speed_pal.png',
    'Stamina/Pal': 'images/stamina_pal.png',
    'Power/Pal': 'images/power_pal.png',
    'Super Creek SSR Stamina Support Card': 'images/super_creek.png',
    'Mejiro McQueen SSR Stamina Support Card': 'images/mejiro_mcqueen.png',
    'Rice Shower SSR Power Support Card': 'images/rice_shower.png',
    'Riko Kashimoto SSR Pal Support Card': 'images/riko_kashimoto.png',
};
</script>

<template>
    <CheatSheetLayout :page-title="pageTitle">
        <div class="space-y-8">
            <div class="prose prose-invert max-w-none">
                <p class="text-neutral-400">
                    Recommended support card decks and target stats for
                    different scenarios and distances.
                </p>
            </div>

            <div class="grid grid-cols-1 items-start gap-8 xl:grid-cols-2">
                <div
                    v-for="scenario in builds"
                    :key="scenario.Scenario"
                    class="space-y-6"
                >
                    <!-- Scenario Header -->
                    <div
                        class="flex items-center gap-3 border-b border-neutral-800 pb-2"
                    >
                        <Trophy :size="24" class="text-pink-400" />
                        <h2 class="text-2xl font-bold text-white">
                            {{ scenario.Scenario }}
                        </h2>
                    </div>

                    <div class="grid gap-6">
                        <div
                            v-for="distanceGroup in scenario.builds"
                            :key="distanceGroup.Distance"
                            class="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
                        >
                            <!-- Distance Header -->
                            <div
                                class="border-b border-neutral-800 bg-neutral-800/50 p-4"
                            >
                                <h3 class="text-lg font-semibold text-white">
                                    {{ distanceGroup.Distance }}
                                </h3>
                            </div>

                            <div class="divide-y divide-neutral-800">
                                <div
                                    v-for="(
                                        build, bIndex
                                    ) in distanceGroup.build"
                                    :key="bIndex"
                                    class="space-y-4 p-4"
                                >
                                    <!-- Inherit -->
                                    <div
                                        class="flex items-start gap-2 rounded-lg bg-neutral-950/30 p-2 text-sm text-neutral-300"
                                    >
                                        <Info
                                            :size="16"
                                            class="mt-0.5 text-blue-400"
                                        />
                                        <span>
                                            Inherit:
                                            <span
                                                class="font-medium text-white"
                                            >
                                                {{ build.Inherit }}
                                            </span>
                                        </span>
                                    </div>

                                    <!-- Cards -->
                                    <div class="flex flex-wrap gap-2">
                                        <div
                                            v-for="(
                                                card, cIndex
                                            ) in build.Cards"
                                            :key="cIndex"
                                            class="group relative h-[66px] w-[66px] shrink-0 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800"
                                        >
                                            <img
                                                v-if="cardImages[card]"
                                                :src="`/${cardImages[card]}`"
                                                :alt="card"
                                                :title="card"
                                                class="h-full w-full object-cover"
                                            />
                                            <div
                                                v-else
                                                class="flex h-full items-center justify-center p-1 text-center text-[10px] leading-tight text-neutral-500"
                                            >
                                                {{ card }}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Target Stats -->
                                    <div>
                                        <div
                                            class="mb-2 flex items-center gap-2"
                                        >
                                            <TrendingUp
                                                :size="16"
                                                class="text-green-400"
                                            />
                                            <span
                                                class="text-sm font-semibold text-neutral-200"
                                                >Target Stats</span
                                            >
                                        </div>
                                        <div
                                            class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 md:grid-cols-6"
                                        >
                                            <template
                                                v-for="(value, stat) in build[
                                                    'Target Stats'
                                                ]"
                                                :key="stat"
                                            >
                                                <div
                                                    v-if="value"
                                                    class="rounded border border-neutral-800 bg-neutral-800/50 p-2 text-center"
                                                >
                                                    <div
                                                        class="mb-1 text-xs text-neutral-400 uppercase"
                                                    >
                                                        {{
                                                            stat === 'Misc'
                                                                ? ''
                                                                : stat
                                                        }}
                                                    </div>
                                                    <div
                                                        class="font-mono font-medium text-white"
                                                    >
                                                        {{ value }}
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>

                                    <!-- Note -->
                                    <div
                                        v-if="build.Note"
                                        class="border-l-2 border-neutral-700 py-1 pl-3 text-sm text-neutral-400 italic"
                                    >
                                        {{ build.Note }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CheatSheetLayout>
</template>
