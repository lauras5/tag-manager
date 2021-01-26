<script>
    import {tags} from './stores.js';

    import Tag from './Tag.svelte';
    import TagView from './TagView.svelte';
</script>

<div class="tag-container flex items-start content-start flex-wrap overflow-auto">
    <TagView></TagView>
    {#each $tags as tag}
        <Tag {...tag}></Tag>
    {/each}
</div>

<style>
    .tag-container {
        height: 100%;
    }
</style>