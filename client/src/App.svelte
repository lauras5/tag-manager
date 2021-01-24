<script>
    import {tags} from './stores.js';
	import { onMount } from 'svelte';
	import { listTags } from 'sql-tag-system-fetch-utils';
    import Tag from './Tag.svelte';
    import TagView from './TagView.svelte';

    async function getTags() {
        let list = await listTags();
        $tags = list;
    }

    onMount(async () => {
        await getTags();
    });

    async function handleLoadMore() {
        let limit = 100;
        let page = 0;

        let additionalTags = await listTags(page, limit);
        $tags = [...$tags, ...additionalTags];
    }

</script>

<div>
    <div class="tag-container flex items-start content-start flex-wrap mt-3 mb-15 overflow-auto">
        <TagView></TagView>
        {#each $tags as tag}
            <Tag {...tag}></Tag>
        {/each}
    </div>

    <div class="fixed bottom-5 items-center w-screen flex justify-center items-center">
        <button class="w-48 bg-blue-300 p-1 rounded-2xl focus:outline-none" on:click={handleLoadMore}>Load More</button>
    </div>
</div>
