<script setup lang="ts">
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import CheatSheetSidebar from '@/components/CheatSheetSidebar.vue';
import { Menu } from 'lucide-vue-next';

type Props = {
    pageTitle?: string;
};

const props = withDefaults(defineProps<Props>(), {
    pageTitle: 'Home',
});

const sidebarOpen = ref(false);
</script>

<template>
    <Head :title="pageTitle">
        <meta name="author" content="Quakey" />
        <meta
            name="description"
            content="Umamusume Cheat Sheet - Your comprehensive guide for Uma Musume Pretty Derby"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <meta property="og:url" content="https://umamusume.wildquaker.com/" />
        <meta property="og:site_name" content="Umamusume Cheat Sheet" />
        <meta property="og:locale" content="en_us" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
    </Head>
    <div class="flex min-h-screen bg-neutral-950 font-sans text-neutral-100">
        <CheatSheetSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

        <main class="min-w-0 flex-1">
            <!-- Mobile header -->
            <div
                class="sticky top-0 z-30 flex h-16 items-center border-b border-neutral-800 bg-neutral-900/50 px-4 backdrop-blur md:hidden"
            >
                <button
                    class="p-2 text-neutral-400 hover:text-white"
                    @click="sidebarOpen = true"
                >
                    <Menu :size="24" />
                </button>
                <span class="ml-4 font-semibold">Umamusume Cheat Sheet</span>
            </div>

            <div class="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
                <div class="space-y-2">
                    <h1
                        class="text-3xl font-bold tracking-tight text-white md:text-4xl"
                    >
                        Umamusume Cheat Sheet
                    </h1>
                    <h2 class="text-xl font-medium text-pink-400 md:text-2xl">
                        {{ props.pageTitle }}
                    </h2>
                </div>

                <div class="h-px bg-neutral-800"></div>

                <div class="animate-slide-up">
                    <slot />
                </div>
            </div>

            <slot name="modals" />
        </main>
    </div>
</template>
