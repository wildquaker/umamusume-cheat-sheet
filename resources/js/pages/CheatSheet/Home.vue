<script setup lang="ts">
import CheatSheetLayout from '@/layouts/CheatSheetLayout.vue';
import { Link } from '@inertiajs/vue3';
import {
    User,
    BookOpen,
    Clover,
    Flag,
    Link2,
    ArrowRight,
    Info,
} from 'lucide-vue-next';

defineProps<{
    pageTitle: string;
}>();

const quickLinks = [
    {
        href: '/characters',
        label: 'Characters',
        desc: 'View all Uma guides',
        icon: User,
        color: 'pink',
    },
    {
        href: '/skills',
        label: 'Skills',
        desc: 'Skill recommendations',
        icon: BookOpen,
        color: 'blue',
    },
    {
        href: '/builds',
        label: 'Builds',
        desc: 'Support card decks',
        icon: Clover,
        color: 'green',
    },
    {
        href: '/races',
        label: 'Races',
        desc: 'Key race schedule',
        icon: Flag,
        color: 'yellow',
    },
    {
        href: '/links',
        label: 'Links',
        desc: 'External resources',
        icon: Link2,
        color: 'purple',
    },
];

const colorClasses: Record<
    string,
    { bg: string; text: string; hoverBg: string; hoverBorder: string }
> = {
    pink: {
        bg: 'bg-pink-500/10',
        text: 'text-pink-400',
        hoverBg: 'group-hover:bg-pink-500/20',
        hoverBorder: 'hover:border-pink-500/50',
    },
    blue: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        hoverBg: 'group-hover:bg-blue-500/20',
        hoverBorder: 'hover:border-blue-500/50',
    },
    green: {
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        hoverBg: 'group-hover:bg-green-500/20',
        hoverBorder: 'hover:border-green-500/50',
    },
    yellow: {
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-400',
        hoverBg: 'group-hover:bg-yellow-500/20',
        hoverBorder: 'hover:border-yellow-500/50',
    },
    purple: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        hoverBg: 'group-hover:bg-purple-500/20',
        hoverBorder: 'hover:border-purple-500/50',
    },
};
</script>

<template>
    <CheatSheetLayout :page-title="pageTitle">
        <div class="space-y-8">
            <!-- Hero Image -->
            <div
                class="relative overflow-hidden rounded-xl border border-neutral-800 shadow-2xl"
            >
                <img
                    src="/images/home_art.webp"
                    alt="Umamusume Home Art"
                    class="h-auto w-full object-cover"
                    loading="lazy"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"
                ></div>
                <div class="absolute right-0 bottom-0 left-0 p-6 md:p-8">
                    <h2 class="mb-2 text-2xl font-bold text-white md:text-3xl">
                        Your Personal Training Guide
                    </h2>
                    <p class="max-w-2xl text-neutral-300">
                        Everything you need to raise champion Uma Musume - from
                        skill recommendations to support card builds.
                    </p>
                </div>
            </div>

            <!-- Quick Access -->
            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-white">Quick Access</h3>
                <div
                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <Link
                        v-for="item in quickLinks"
                        :key="item.href"
                        :href="item.href"
                        class="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 transition-all hover:bg-neutral-800/50"
                        :class="colorClasses[item.color].hoverBorder"
                    >
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-lg transition-colors"
                            :class="[
                                colorClasses[item.color].bg,
                                colorClasses[item.color].text,
                                colorClasses[item.color].hoverBg,
                            ]"
                        >
                            <component :is="item.icon" :size="20" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <h4
                                class="font-semibold text-white transition-colors"
                                :class="`group-hover:${colorClasses[item.color].text}`"
                            >
                                {{ item.label }}
                            </h4>
                            <p class="truncate text-sm text-neutral-400">
                                {{ item.desc }}
                            </p>
                        </div>
                        <ArrowRight
                            :size="20"
                            class="transition-colors"
                            :class="`text-neutral-600 group-hover:${colorClasses[item.color].text}`"
                        />
                    </Link>
                </div>
            </div>

            <!-- About -->
            <div
                class="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
            >
                <div class="flex items-start gap-4">
                    <div
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
                    >
                        <Info :size="20" />
                    </div>
                    <div>
                        <h4 class="mb-1 font-semibold text-white">
                            About This Guide
                        </h4>
                        <p class="text-sm leading-relaxed text-neutral-400">
                            This cheat sheet is designed to help trainers
                            quickly find the information they need for raising
                            Uma Musume. Data is based on the Global version and
                            community research. Use the navigation on the left
                            to explore different sections.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </CheatSheetLayout>
</template>
