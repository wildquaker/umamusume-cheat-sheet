<script setup lang="ts">
import { ref, computed } from 'vue';
import CheatSheetLayout from '@/layouts/CheatSheetLayout.vue';
import {
    Search,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    X,
} from 'lucide-vue-next';

type Character = {
    name: string;
    image: string;
    guide: string;
};

const props = defineProps<{
    pageTitle: string;
    characters: Character[];
}>();

// Search/Filter
const searchQuery = ref('');

const filteredCharacters = computed(() => {
    if (!searchQuery.value) return props.characters;
    const q = searchQuery.value.toLowerCase();
    return props.characters.filter((c) => c.name.toLowerCase().includes(q));
});

function resetSearch() {
    searchQuery.value = '';
}

// Modal
const modalOpen = ref(false);
const modalIndex = ref(0);

const modalCharacter = computed(
    () => filteredCharacters.value[modalIndex.value],
);

function openModal(index: number) {
    modalIndex.value = index;
    modalOpen.value = true;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOpen.value = false;
    document.body.style.overflow = '';
}

function prevCharacter() {
    modalIndex.value =
        (modalIndex.value - 1 + filteredCharacters.value.length) %
        filteredCharacters.value.length;
}

function nextCharacter() {
    modalIndex.value = (modalIndex.value + 1) % filteredCharacters.value.length;
}

function handleKeydown(e: KeyboardEvent) {
    if (!modalOpen.value) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevCharacter();
    if (e.key === 'ArrowRight') nextCharacter();
}

// Listen for keyboard events
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown);
}

function onImageLoad(e: Event) {
    const img = e.target as HTMLImageElement;
    img.classList.remove('opacity-0');
    img.parentElement?.classList.remove('animate-pulse', 'bg-neutral-800');
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
                        Character Database
                    </h1>
                    <p class="text-neutral-400">
                        Comprehensive guide for all Umamusume characters. Click
                        on a character to view their detailed guide.
                    </p>
                </div>
                <div class="shrink-0 text-sm text-neutral-500">
                    Total Characters: {{ characters.length }}
                </div>
            </div>

            <!-- Search -->
            <div class="flex flex-wrap gap-4">
                <div class="relative min-w-[200px] flex-1">
                    <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                        <Search :size="20" class="text-neutral-500" />
                    </div>
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search characters..."
                        aria-label="Search characters"
                        class="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-3 pr-4 pl-10 text-white placeholder-neutral-500 transition-colors focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 focus:outline-none"
                    />
                    <div
                        v-if="searchQuery"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-neutral-500"
                    >
                        {{ filteredCharacters.length }} found
                    </div>
                </div>
                <button
                    type="button"
                    class="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white focus:border-pink-500/50 focus:outline-none"
                    @click="resetSearch"
                >
                    <RotateCcw :size="16" />
                    Reset
                </button>
            </div>

            <!-- Character Grid -->
            <div
                class="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
            >
                <button
                    v-for="(character, index) in filteredCharacters"
                    :key="character.name"
                    class="group relative block w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 text-left transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]"
                    @click="openModal(index)"
                >
                    <div
                        class="relative flex aspect-[3/4] animate-pulse items-center justify-center bg-neutral-800 p-2"
                    >
                        <div
                            class="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"
                        ></div>
                        <img
                            :src="`/${character.image}`"
                            :alt="character.name"
                            class="z-0 h-[115px] w-[115px] object-contain opacity-0 transition-all duration-300 group-hover:h-32 group-hover:w-32"
                            loading="lazy"
                            @load="onImageLoad"
                        />
                        <div class="absolute right-0 bottom-0 left-0 z-20 p-3">
                            <h3
                                class="truncate text-center text-sm font-medium text-white transition-colors group-hover:text-pink-400"
                            >
                                {{ character.name }}
                            </h3>
                        </div>
                    </div>
                </button>
            </div>

            <!-- Empty State -->
            <div
                v-if="filteredCharacters.length === 0"
                class="py-12 text-center"
            >
                <div class="text-lg text-neutral-500">
                    No characters found matching your search.
                </div>
            </div>
        </div>

        <!-- Modal -->
        <template #modals>
            <div
                v-if="modalOpen"
                class="fixed inset-0 z-50"
                role="dialog"
                aria-modal="true"
            >
                <div
                    class="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    @click="closeModal"
                ></div>

                <div
                    class="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
                >
                    <div
                        class="animate-zoom-fade pointer-events-auto relative flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl"
                    >
                        <div
                            class="flex shrink-0 items-center justify-between border-b border-neutral-800 p-4"
                        >
                            <h2 class="text-xl font-bold text-white">
                                {{ modalCharacter?.name }}
                            </h2>
                            <div class="flex items-center gap-2">
                                <button
                                    class="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                                    title="Previous (←)"
                                    @click="prevCharacter"
                                >
                                    <ChevronLeft :size="20" />
                                </button>
                                <button
                                    class="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                                    title="Next (→)"
                                    @click="nextCharacter"
                                >
                                    <ChevronRight :size="20" />
                                </button>
                                <button
                                    class="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                                    @click="closeModal"
                                >
                                    <X :size="24" />
                                </button>
                            </div>
                        </div>
                        <div class="custom-scrollbar overflow-auto p-4">
                            <div
                                class="flex justify-center rounded-lg bg-neutral-950/50"
                            >
                                <img
                                    v-if="modalCharacter"
                                    :src="`/${modalCharacter.guide}`"
                                    :alt="modalCharacter.name"
                                    class="max-h-[75vh] max-w-full rounded-lg object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </CheatSheetLayout>
</template>
