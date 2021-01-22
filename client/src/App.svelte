<script>
	import {onMount} from 'svelte';
	import {addTag, getTag, listTags, deleteTag} from 'sql-tag-system-fetch-utils';
    let tags = [];
    let newTag = '';

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

	onMount(async () => {
	    try {
	        let page = 0;
	        let limit = 20;
            let tags = await listTags(page, limit);
        } catch (e) {
	        console.log(`Error: ${e}`)
        }
    });

</script>

<div>
    <input class="new-tag-input" bind:value={newTag}>
    <button class='pl-4 pr-4 bg-gray-200 rounded-2xl' on:click={handleAdd}>Add Tag</button>
</div>

<div class="tag-container flex flex-wrap">
    {#each tags as {id, tag}}
        <div class='inline-flex m-2 bg-gray-200 p-1 pl-4 pr-1 rounded-2xl'>
            <span>{tag}</span>
            <span class="ml-4 bg-gray-300 rounded-full w-6 h-6 flex justify-center items-center leading-6 pb-0.5" on:click={removeTag(id)}>x</span>
        </div>
    {/each}
</div>
