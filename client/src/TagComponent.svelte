<script>
    import { deleteTag } from 'sql-tag-system-fetch-utils';
    import { fade } from 'svelte/transition';
    import Icon from 'fa-svelte'
    import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

    export let tags;

    async function handleDelete(tagId) {
        try {
            await deleteTag(tagId);
            tags = tags.filter(tag => tag.id !== tagId );
        } catch (e) {
            console.log(`Error: ${e}`)
        }
    }

</script>

{#each tags as {id, tag}}
    <div transition:fade class='inline-flex m-2 bg-gray-300 p-1 pl-4 pr-1 rounded-2xl'>
        <span>{tag}</span>
        <span class="ml-4 bg-gray-300 rounded-full w-6 h-6 flex justify-center items-center leading-6" on:click={handleDelete(id)}>
              <Icon class="myClass1 myClass2" icon={faTimes}></Icon>
        </span>
    </div>
{/each}
