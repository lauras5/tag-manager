<script>
    import { tags } from './stores.js';
    import { deleteTag } from 'sql-tag-system-fetch-utils';
    import { fade } from 'svelte/transition';
    import Icon from 'fa-svelte'
    import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

    export let id;
    export let tag;

    async function handleDelete(tagId) {
        await deleteTag(tagId);
        $tags = $tags.filter(tag => tag.id !== tagId );
    }

</script>

<div transition:fade class='inline-flex m-2 bg-gray-300 p-1 pl-4 pr-1 rounded-2xl'>
    <span>{tag}</span>
    <span class="ml-4 bg-gray-300 rounded-full w-6 h-6 flex justify-center items-center leading-6" on:click={() => handleDelete(id)}>
          <Icon icon={faTimes}></Icon>
    </span>
</div>
