<script>
	import {onMount} from 'svelte';
	import {addTag, getTag, listTags, deleteTag} from 'sql-tag-system-fetch-utils';
    let tags = [];
    let newTag = '';

    async function removeTag(tagId) {
        try {
            await deleteTag(tagId);
            tags = tags.filter(tag => tag.id !== tagId );
        } catch {
            console.log('error deleting tag')
        }
    }

    async function addNewTag(tag) {
        let newTagId = await addTag(tag);
        let newTagInfo = await getTag(newTagId);
        tags = [...tags, newTagInfo];
        newTag = '';
    }

	onMount(async () => {
	    try {
            let tags = await listTags();
        } catch {
	        console.log('error loading tags')
        }
    });

</script>

<style>
    .tag {
        border-radius: 20px;
    }

    .tag-delete {
        border-radius:50%;
        width: 25px;
        height: 25px;
        justify-content: center;
        align-items: center;
        display: flex;
        line-height: 25px;
    }
</style>

<div>
    <input class="new-tag-input" bind:value={newTag}>
    <button class='btn new-tag-btn pl-4 pr-4 bg-gray-200' on:click={addNewTag(newTag)}>Add Tag</button>
</div>

<div class="tag-container flex flex-wrap">
    {#each tags as {id, tag}}
        <div class='tag tag-card inline-flex m-2 bg-gray-200 p-1 pl-4 pr-1'>
            <span>{tag}</span>
            <span class="tag-delete ml-4 bg-gray-300" on:click={removeTag(id)}>x</span>
        </div>
    {/each}
</div>
