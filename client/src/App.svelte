<script>
	import {onMount} from 'svelte';
	import { fade } from 'svelte/transition';
	import {addTag, getTag, listTags, deleteTag} from 'sql-tag-system-fetch-utils';
    let tags = [];
    let newTag = '';
    let limit = 200;
    let page = 0;

    async function removeTag(tagId) {
        try {
            await deleteTag(tagId);
            tags = tags.filter(tag => tag.id !== tagId );
        } catch (e) {
            console.log(`Error: ${e}`)
        }
    }

    async function handleAdd() {
        if (newTag != '') {
            try {
                let newTagId = await addTag(newTag);
                tags = [...tags, { id:newTagId, tag:newTag }];
            } catch (e) {
                console.log(`Error: ${e}`);
            }

            newTag = '';
        }
    }

    async function getNewPage() {
        page++;

        let additionalTags = await listTags(page, limit);
        tags = [...tags, ...additionalTags];
    }

	onMount(async () => {
	    try {
            tags = await listTags(page, limit);
        } catch (e) {
	        console.log(`Error: ${e}`)
        }
    });

</script>

<div>
    <div>
        <input class="new-tag-input" bind:value={newTag}>
        <button class='pl-4 pr-4 bg-gray-200 rounded-2xl' on:click={handleAdd}>Add Tag</button>
    </div>

    <div class="tag-container flex flex-wrap mt-3 mb-15 overflow-auto">
        {#each tags as {id, tag}}
            <div transition:fade class='inline-flex m-2 bg-gray-200 p-1 pl-4 pr-1 rounded-2xl'>
                <span>{tag}</span>
                <span class="ml-4 bg-gray-300 rounded-full w-6 h-6 flex justify-center items-center leading-6 pb-0.5" on:click={removeTag(id)}>x</span>
            </div>
        {/each}
    </div>

    <div class="fixed bottom-5 items-center w-screen flex justify-center items-center">
        <button class="w-48 bg-blue-300 p-1 rounded-2xl" on:click={getNewPage}>Load More</button>
    </div>
</div>
