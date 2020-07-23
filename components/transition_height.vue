<template>
    <transition
        name="transition-height"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
    >
        <slot />
    </transition>
</template>

<script>
    export default {
        name: 'TransitionHeight',
        methods: {
            enter (element) {
                // Hide the element at full size
                element.style.width = getComputedStyle(element).width;
                element.style.position = 'absolute';
                element.style.visibility = 'hidden';
                element.style.height = 'auto';

                // Get what will be the visible height
                const height = getComputedStyle(element).height;

                // Set the height to zero
                element.style.width = null;
                element.style.position = null;
                element.style.visibility = null;
                element.style.height = 0;

                // Force repaint
                // eslint-disable-next-line no-unused-expressions
                getComputedStyle(element).height;

                // Wait for repaint & animate to absolute height
                requestAnimationFrame(() => {
                    element.style.height = height;
                });
            },
            afterEnter (element) {
                // Once at normal height, unset absolute height
                element.style.height = null;
            },
            leave (element) {
                // Set the current height as an absolute value
                element.style.height = getComputedStyle(element).height;

                // Force repaint
                // eslint-disable-next-line no-unused-expressions
                getComputedStyle(element).height;

                // Wait for repaint & animate height to 0
                requestAnimationFrame(() => {
                    element.style.height = 0;
                });
            },
        },
    };
</script>
