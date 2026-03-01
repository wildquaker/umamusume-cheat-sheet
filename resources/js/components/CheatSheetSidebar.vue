<script setup lang="ts">
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { Home, Link2, User, BookOpen, Flag, Clover, X } from 'lucide-vue-next';

type Props = {
    open: boolean;
};

defineProps<Props>();
const emit = defineEmits<{ close: [] }>();

const page = usePage();
const currentUrl = computed(() => page.url);

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/links', label: 'Links', icon: Link2 },
    { href: '/characters', label: 'Umas', icon: User },
    { href: '/skills', label: 'Skills', icon: BookOpen },
    { href: '/races', label: 'Races', icon: Flag },
    { href: '/builds', label: 'Builds', icon: Clover },
];

function isActive(href: string): boolean {
    if (href === '/') return currentUrl.value === '/';
    return currentUrl.value.startsWith(href);
}
</script>

<template>
    <!-- Overlay -->
    <div
        v-if="open"
        class="fixed inset-0 z-40 bg-black/50 md:hidden"
        @click="emit('close')"
    ></div>

    <!-- Sidebar -->
    <aside
        class="fixed inset-y-0 left-0 z-50 w-64 border-r border-neutral-800 bg-neutral-900 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:shrink-0 md:translate-x-0"
        :class="open ? 'translate-x-0' : '-translate-x-full'"
    >
        <div
            class="flex h-16 items-center justify-between border-b border-neutral-800 px-6"
        >
            <span class="text-xl font-bold text-white">Menu</span>
            <button
                class="text-neutral-400 hover:text-white md:hidden"
                @click="emit('close')"
            >
                <X :size="24" />
            </button>
        </div>

        <nav class="space-y-2 p-4">
            <Link
                v-for="item in navItems"
                :key="item.href"
                :href="item.href"
                class="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors"
                :class="
                    isActive(item.href)
                        ? 'bg-pink-500/10 text-pink-400'
                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                "
                @click="emit('close')"
            >
                <component :is="item.icon" :size="20" />
                <span class="font-medium">{{ item.label }}</span>
            </Link>
        </nav>
    </aside>
</template>
