<script>
    import {tags} from './stores.js';
	import { onMount } from 'svelte';
	import { addTag, listTags } from 'sql-tag-system-fetch-utils';
    import Tag from './Tag.svelte';

    let newTag = '';

    async function getTags() {
        let list = await listTags();
        $tags = list;
    }

    onMount(async () => {
        await getTags();
    });

    async function handleAdd() {
        if (newTag != '') {
            let newTags = newTag.split(",");

            for (let tag of newTags) {
                tag = tag.trim();

                if (tag) {
                    try {
                        let newTagId = await addTag(tag);
                        $tags = [...$tags, { id:newTagId, tag:tag }];
                    } catch(err) {
                        console.log(err);
                    }
                }
            }

            newTag = '';
        }
    }

    async function handleLoadMore() {
        let limit = 100;
        let page = 0;

        let additionalTags = await listTags(page, limit);
        $tags = [...$tags, ...additionalTags];
    }

</script>

<div>
    <div>
        <input class="new-tag-input w-96" bind:value={newTag} placeholder="separate tags with commas">
        <button class='pl-4 pr-4 bg-gray-200 rounded-2xl' on:click={handleAdd}>Add Tag</button>
    </div>

    <div class="tag-container flex items-start content-start flex-wrap mt-3 mb-15 overflow-auto">
        {#each $tags as tag}
            <Tag {...tag}></Tag>
        {/each}
    </div>

    <div class="fixed bottom-5 items-center w-screen flex justify-center items-center">
        <button class="w-48 bg-blue-300 p-1 rounded-2xl focus:outline-none" on:click={handleLoadMore}>Load More</button>
    </div>
</div>
