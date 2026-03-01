<script setup lang="ts">
import { ref, computed } from 'vue';
import CheatSheetLayout from '@/layouts/CheatSheetLayout.vue';
import { Search, RotateCcw } from 'lucide-vue-next';

type Skill = {
    Skill: string;
    Rating: string;
    Style: string;
    Distance: string;
};

const props = defineProps<{
    pageTitle: string;
    skills: Skill[];
}>();

const searchQuery = ref('');
const ratingFilter = ref('All');
const styleFilter = ref('All');
const distanceFilter = ref('All');

const filteredSkills = computed(() => {
    return props.skills.filter((skill) => {
        const matchesSearch =
            !searchQuery.value ||
            skill.Skill.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesRating =
            ratingFilter.value === 'All' || skill.Rating === ratingFilter.value;
        const matchesStyle =
            styleFilter.value === 'All' ||
            skill.Style === styleFilter.value ||
            skill.Style === 'All';
        const matchesDistance =
            distanceFilter.value === 'All' ||
            skill.Distance === distanceFilter.value ||
            skill.Distance === 'All';
        return (
            matchesSearch && matchesRating && matchesStyle && matchesDistance
        );
    });
});

function resetFilters() {
    searchQuery.value = '';
    ratingFilter.value = 'All';
    styleFilter.value = 'All';
    distanceFilter.value = 'All';
}

function ratingClasses(rating: string): string {
    switch (rating) {
        case 'Best':
            return 'bg-yellow-500/20 text-yellow-400';
        case 'Good':
            return 'bg-blue-500/20 text-blue-400';
        case 'Situational':
            return 'bg-purple-500/20 text-purple-400';
        default:
            return 'bg-neutral-500/20 text-neutral-400';
    }
}
</script>

<template>
    <CheatSheetLayout :page-title="pageTitle">
        <div class="space-y-6">
            <!-- Header -->
            <div
                class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
            >
                <div>
                    <h1 class="mb-2 text-3xl font-bold text-white">
                        Skills Database
                    </h1>
                    <p class="text-neutral-400">
                        Recommended skills categorized by rating, style, and
                        distance.
                    </p>
                </div>
                <div class="shrink-0 text-sm text-neutral-500">
                    Total Skills: {{ skills.length }}
                </div>
            </div>

            <!-- Search -->
            <div class="relative">
                <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                >
                    <Search :size="20" class="text-neutral-500" />
                </div>
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search skills..."
                    aria-label="Search skills"
                    class="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-3 pr-4 pl-10 text-white placeholder-neutral-500 transition-colors focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 focus:outline-none"
                />
                <div
                    v-if="
                        searchQuery ||
                        ratingFilter !== 'All' ||
                        styleFilter !== 'All' ||
                        distanceFilter !== 'All'
                    "
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-neutral-500"
                >
                    {{ filteredSkills.length }} found
                </div>
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                    <label for="rating-filter" class="text-sm text-neutral-400"
                        >Rating:</label
                    >
                    <select
                        id="rating-filter"
                        v-model="ratingFilter"
                        class="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-pink-500/50 focus:outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Best">Best</option>
                        <option value="Good">Good</option>
                        <option value="Situational">Situational</option>
                        <option value="Excess">Excess</option>
                    </select>
                </div>
                <div class="flex items-center gap-2">
                    <label for="style-filter" class="text-sm text-neutral-400"
                        >Style:</label
                    >
                    <select
                        id="style-filter"
                        v-model="styleFilter"
                        class="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-pink-500/50 focus:outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Front Runner">Front Runner</option>
                        <option value="Pace Chaser">Pace Chaser</option>
                        <option value="Late Surger">Late Surger</option>
                        <option value="End Closer">End Closer</option>
                    </select>
                </div>
                <div class="flex items-center gap-2">
                    <label
                        for="distance-filter"
                        class="text-sm text-neutral-400"
                        >Distance:</label
                    >
                    <select
                        id="distance-filter"
                        v-model="distanceFilter"
                        class="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-pink-500/50 focus:outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Sprint">Sprint</option>
                        <option value="Mile">Mile</option>
                        <option value="Medium">Medium</option>
                        <option value="Long">Long</option>
                    </select>
                </div>
                <button
                    type="button"
                    class="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white focus:border-pink-500/50 focus:outline-none"
                    @click="resetFilters"
                >
                    <RotateCcw :size="16" />
                    Reset
                </button>
            </div>

            <!-- Table -->
            <div
                class="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900"
            >
                <table class="w-full text-left">
                    <thead
                        class="bg-neutral-800/50 text-sm tracking-wider text-neutral-300 uppercase"
                    >
                        <tr>
                            <th class="px-4 py-3 font-semibold">Skill</th>
                            <th class="px-4 py-3 font-semibold">Rating</th>
                            <th class="px-4 py-3 font-semibold">Style</th>
                            <th class="px-4 py-3 font-semibold">Distance</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-800">
                        <tr
                            v-for="skill in filteredSkills"
                            :key="skill.Skill"
                            class="transition-colors hover:bg-neutral-800/30"
                        >
                            <td class="px-4 py-3 text-white">
                                {{ skill.Skill }}
                            </td>
                            <td class="px-4 py-3">
                                <span
                                    class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
                                    :class="ratingClasses(skill.Rating)"
                                >
                                    {{ skill.Rating }}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-neutral-300">
                                {{ skill.Style }}
                            </td>
                            <td class="px-4 py-3 text-neutral-300">
                                {{ skill.Distance }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Empty State -->
            <div v-if="filteredSkills.length === 0" class="py-12 text-center">
                <div class="text-lg text-neutral-500">
                    No skills found matching your search or filters.
                </div>
            </div>
        </div>
    </CheatSheetLayout>
</template>
